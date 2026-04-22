import xss from 'xss';

const COMMENT_PREFIX = '__WREC';
const COMMENT_SUFFIX = '__';
const IDENTIFIER = '[A-Za-z_$][A-Za-z0-9_$]*';
const passthroughAttributes = new Set([
  'checked',
  'colspan',
  'disabled',
  'for',
  'id',
  'max',
  'min',
  'name',
  'rowspan',
  'scope',
  'selected',
  'type',
  'value'
]);

// Creates a unique placeholder token for a preserved HTML comment.
function createCommentToken(batchId: number, commentCount: number): string {
  return `${COMMENT_PREFIX}${batchId}_${commentCount}${COMMENT_SUFFIX}`;
}

// Escapes an HTML attribute value for safe literal insertion.
function escapeAttributeValue(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Determines whether an event attribute value uses Wrec-style handler syntax.
function isWrecEventHandler(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const bareIdentifier = new RegExp(`^${IDENTIFIER}$`);
  if (bareIdentifier.test(trimmed)) return true;

  return trimmed.startsWith('this.');
}

// Sanitizes HTML while preserving placeholder comments used by wrec.
function sanitize(html: string): string {
  const options = {
    allowCommentTag: true,
    onTagAttr(tag: string, name: string, value: string) {
      if (name.startsWith('on')) {
        return isWrecEventHandler(value)
          ? `${name}="${escapeAttributeValue(value)}"`
          : '';
      }
      if (
        name === 'title' ||
        name.startsWith('aria-') ||
        name.startsWith('data-')
      ) {
        return `${name}="${escapeAttributeValue(value)}"`;
      }
      if (tag === 'a' && name === 'href' && value.startsWith('javascript')) {
        return '';
      }
    },
    safeAttrValue(tag: string, name: string, value: string): string {
      if (name === 'class') return value;
      if (passthroughAttributes.has(name)) return value;
      if (tag === 'a' && name === 'href') return value;
      if (tag === 'img' && name === 'src') return value;
      return '';
    },
    stripIgnoreTagBody: ['script', 'style', 'iframe'],
    whiteList: {
      ...(xss as any).getDefaultWhiteList(),
      button: ['class', 'id', 'type'],
      input: [
        'checked',
        'class',
        'disabled',
        'id',
        'max',
        'min',
        'name',
        'type',
        'value'
      ],
      label: ['class', 'for', 'id'],
      option: ['class', 'id', 'selected', 'value'],
      span: ['class', 'id'],
      th: ['class', 'colspan', 'id', 'rowspan', 'scope']
    }
  };

  const comments: Array<{comment: string; token: string}> = [];
  const batchId = Date.now() + Math.floor(Math.random() * 1_000_000);

  // Replace comments with placeholders
  html = html.replace(/<!--[\s\S]*?-->/g, match => {
    const token = createCommentToken(batchId, comments.length);
    comments.push({comment: match, token});
    return token;
  });

  let sanitized = xss(html, options);

  // Restore comments
  comments.forEach(({comment, token}) => {
    sanitized = sanitized.replaceAll(token, comment);
  });

  return sanitized;
}

export default sanitize;
