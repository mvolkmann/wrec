import ts from 'typescript';

// Finds all classes in a source file that extend Wrec.
export function collectWrecClasses(sourceFile) {
  const {names: wrecNames} = getWrecImportInfo(sourceFile);
  const classes = [];

  function visit(node) {
    if (
      ts.isClassDeclaration(node) &&
      node.name &&
      extendsWrec(node, wrecNames)
    ) {
      classes.push(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return classes;
}

// Determines whether a class declaration extends one of the known Wrec imports.
export function extendsWrec(classNode, wrecNames) {
  return Boolean(
    classNode.heritageClauses?.some(
      clause =>
        clause.token === ts.SyntaxKind.ExtendsKeyword &&
        clause.types.some(
          type =>
            ts.isExpressionWithTypeArguments(type) &&
            ts.isIdentifier(type.expression) &&
            wrecNames.has(type.expression.text)
        )
    )
  );
}

// Gets a plain string member name when one can be statically determined.
export function getMemberName(node) {
  const {name} = node;
  return name ? (getNameText(name) ?? undefined) : undefined;
}

// Gets the text value of an AST name node.
export function getNameText(name) {
  return ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isPrivateIdentifier(name)
    ? name.text
    : null;
}

// Collects object-literal property names from property assignments.
export function getPropertyAssignmentNames(objectLiteral) {
  return objectLiteral.properties
    .filter(ts.isPropertyAssignment)
    .map(property => getMemberName(property))
    .filter(name => name !== undefined);
}

// Collects imported Wrec class names and the quote style used for those imports.
export function getWrecImportInfo(sourceFile) {
  const names = new Set(['Wrec']);
  let quote = "'";

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !statement.importClause ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }

    const moduleName = statement.moduleSpecifier.text;
    const isWrecModule =
      moduleName === 'wrec' ||
      moduleName.endsWith('/wrec') ||
      moduleName.endsWith('/wrec.js') ||
      moduleName.endsWith('/wrec.ts');
    if (!isWrecModule) continue;

    const namedBindings = statement.importClause.namedBindings;
    if (!namedBindings || !ts.isNamedImports(namedBindings)) continue;

    for (const element of namedBindings.elements) {
      const importedName = element.propertyName?.text ?? element.name.text;
      if (importedName === 'Wrec') {
        names.add(element.name.text);
        const moduleText = statement.moduleSpecifier.getText(sourceFile);
        quote = moduleText[0];
      }
    }
  }

  return {names, quote};
}

// Determines if an AST node has the static modifier.
export function hasStaticModifier(node) {
  return ts.canHaveModifiers(node)
    ? ts
        .getModifiers(node)
        ?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword)
    : false;
}
