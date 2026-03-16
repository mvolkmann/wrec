import xss from 'xss';

const keepTags = new Set(['input', 'label', 'option', 'th']);
const COMMENT_PREFIX = '__WREC';
const COMMENT_SUFFIX = '__';

function sanitize(html: string): string {
  const options = {
    allowCommentTag: true,
    onTag: (tag: string, html: string) => {
      // For these tags, return the original HTML.
      if (keepTags.has(tag)) return html;
      // For all other tags, return nothing
      // and let xss use its default behavior.
    },
    onTagAttr(tag: string, name: string, _value: string) {
      if (name.startsWith('on')) return '';
    },
    safeAttrValue(tag: string, name: string, value: string): string {
      if (name === 'class') return value;
      if (tag === 'a' && name === 'href') {
        if (!value.startsWith('javascript')) return value;
      }
      if (tag === 'img' && name === 'src') return value;
      return '';
    },
    stripIgnoreTagBody: ['script', 'style', 'iframe'],
    whiteList: {
      ...(xss as any).getDefaultWhiteList(),
      label: ['class', 'for'],
      span: ['class']
    }
  };

  const comments: string[] = [];

  // Replace comments with placeholders
  html = html.replace(/<!--[\s\S]*?-->/g, match => {
    let token = '';
    do {
      token = COMMENT_PREFIX + comments.length + COMMENT_SUFFIX;
    } while (html.includes(token));
    comments.push(match);
    return token;
  });

  let sanitized = xss(html, options);

  // Restore comments
  comments.forEach((comment, index) => {
    const tokenPattern = new RegExp(
      `${COMMENT_PREFIX}${index}${COMMENT_SUFFIX}`,
      'g'
    );
    sanitized = sanitized.replace(tokenPattern, comment);
  });

  return sanitized;
}

export default sanitize;
