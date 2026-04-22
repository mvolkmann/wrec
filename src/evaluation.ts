type ComponentClassLike = {
  context?: Record<string, any>;
  properties?: Record<string, PropertyConfigLike>;
  prototype: object;
};

type PropertyConfigLike = {
  computed?: string;
  type?: unknown;
  usedBy?: string | string[];
  value?: unknown;
  values?: unknown[];
};

const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;

export const CALL_RE = new RegExp(`this\\.(${IDENTIFIER})\\s*\\(`, 'g');
export const HTML_COMMENT_TEXT_RE = /<!--\s*(.*?)\s*-->/;
export const REF_RE = new RegExp(`^this\\.${IDENTIFIER}$`);
export const REFS_RE = new RegExp(
  `this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`,
  'g'
);
export const REFS_TEST_RE = new RegExp(
  `this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`
);
export const SKIP = 'this.'.length;

// Applies configured default values to missing properties
// in an evaluation scope.
function applyDefaultPropertyValues(
  scope: Record<string, any>,
  properties: Record<string, PropertyConfigLike>
) {
  for (const [propName, config] of Object.entries(properties)) {
    if (scope[propName] !== undefined) continue;
    scope[propName] = defaultForConfig(config);
  }
}

// Builds dependency metadata for computed properties in an evaluation scope.
function buildComputedMetadata(
  scope: Record<string, any>,
  properties: Record<string, PropertyConfigLike>
) {
  const computedNames = Object.entries(properties)
    .filter(([_propName, config]) => Boolean(config.computed))
    .map(([propName]) => propName);
  const computedSet = new Set(computedNames);
  const dependenciesMap = new Map<string, string[]>();
  const expressions = new Map<string, string>();

  for (const computedName of computedNames) {
    const config = properties[computedName];
    const expr = config.computed!;
    const dependencies = new Set<string>();

    for (const match of expr.matchAll(REFS_RE)) {
      const referencedProp = getExpressionPropName(match[0]);
      const getterDependency = propertyToGetter(referencedProp);
      let registeredGetterDependency = false;

      for (const [propName, propConfig] of Object.entries(properties)) {
        if (usedByArray(propConfig.usedBy)?.includes(getterDependency)) {
          dependencies.add(propName);
          registeredGetterDependency = true;
        }
      }

      if (
        !registeredGetterDependency &&
        typeof scope[referencedProp] !== 'function'
      ) {
        dependencies.add(referencedProp);
      }
    }

    for (const match of expr.matchAll(CALL_RE)) {
      const methodName = match[1];
      for (const [propName, propConfig] of Object.entries(properties)) {
        if (usedByArray(propConfig.usedBy)?.includes(methodName)) {
          dependencies.add(propName);
        }
      }
    }

    dependenciesMap.set(
      computedName,
      [...dependencies].filter(dependency => computedSet.has(dependency)).sort()
    );
    expressions.set(computedName, expr);
  }

  return {computedNames, dependenciesMap, expressions};
}

// Computes all computed properties in dependency order for an evaluation scope.
function computeComputedProperties(
  componentClass: ComponentClassLike,
  scope: Record<string, any>
) {
  const properties = componentClass.properties ?? {};
  const {computedNames, dependenciesMap, expressions} = buildComputedMetadata(
    scope,
    properties
  );
  const dependentsMap = new Map<string, string[]>();
  const dependencyCountMap = new Map<string, number>();
  const queue: string[] = [];

  for (const computedName of computedNames) {
    const dependencies = dependenciesMap.get(computedName) ?? [];
    dependencyCountMap.set(computedName, dependencies.length);
    if (dependencies.length === 0) queue.push(computedName);
    for (const dependency of dependencies) {
      const dependents = dependentsMap.get(dependency) ?? [];
      dependents.push(computedName);
      dependentsMap.set(dependency, dependents);
    }
  }

  const orderedNames: string[] = [];
  for (let index = 0; index < queue.length; index++) {
    const computedName = queue[index];
    orderedNames.push(computedName);
    const dependents = dependentsMap.get(computedName) ?? [];
    for (const dependentName of dependents) {
      const dependencyCount = dependencyCountMap.get(dependentName)! - 1;
      dependencyCountMap.set(dependentName, dependencyCount);
      if (dependencyCount === 0) queue.push(dependentName);
    }
  }

  if (orderedNames.length !== computedNames.length) {
    const cycleNames = computedNames
      .filter(computedName => dependencyCountMap.get(computedName)! > 0)
      .sort();
    throw new Error(
      `computed properties form a cycle: ${cycleNames.join(', ')}`
    );
  }

  const context = componentClass.context ?? {};
  for (const computedName of orderedNames) {
    const expression = expressions.get(computedName)!;
    scope[computedName] = evaluateInScope(expression, scope, context);
  }
}

// Returns the default value implied by a property configuration.
function defaultForConfig(config: PropertyConfigLike) {
  if (config.value !== undefined) return config.value;
  return Array.isArray(config.values) && config.values.length > 0
    ? config.values[0]
    : defaultForType(config.type);
}

// Returns the default value implied by a declared property type.
function defaultForType(type: unknown) {
  return type === String
    ? ''
    : type === Number
      ? 0
      : type === Boolean
        ? false
        : type === Array
          ? []
          : type === Object
            ? {}
            : undefined;
}

// Evaluates an expression with component properties on `this` and context in scope.
export function evaluateInScope(
  expression: string,
  scope: Record<string, any>,
  context: Record<string, any> = {}
) {
  const fn = new Function(
    'context',
    `const {${Object.keys(context).join(',')}} = context; return ${expression};`
  );
  return fn.call(scope, context);
}

// Takes a string like "this.foo.bar" and returns "foo".
export function getExpressionPropName(str: string) {
  return str.substring(SKIP).split('.')[0];
}

// Creates a shared evaluation scope for client and SSR expression execution.
export function initializeEvaluationScope(
  componentClass: ComponentClassLike,
  inputProperties: Record<string, any> = {}
) {
  const scope = Object.create(componentClass.prototype) as Record<string, any>;
  Object.assign(scope, inputProperties);
  applyDefaultPropertyValues(scope, componentClass.properties ?? {});
  computeComputedProperties(componentClass, scope);
  return scope;
}

// Converts a property name to a getter method name.
function propertyToGetter(propName: string) {
  return `get ${propName}`;
}

// Normalizes a `usedBy` declaration to an array.
function usedByArray(usedBy?: string | string[]) {
  return typeof usedBy === 'string' ? [usedBy] : usedBy;
}
