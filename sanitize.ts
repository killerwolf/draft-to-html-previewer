import DOMPurify from "dompurify";

/**
 * `draftjs-to-html` escapes block text, but interpolates entity data straight
 * into attributes (LINK/MENTION `href`, IMAGE `src`/`alt`, EMBEDDED_LINK
 * `src`) and block `data` into `style`. Untrusted pasted JSON can therefore
 * break out of an attribute or tag and inject markup into the preview.
 *
 * Sanitizing on an allowlist restricted to the tags and attributes the
 * converter actually emits keeps the rendered output identical while making
 * attribute injection inert.
 */
const ALLOWED_TAGS = [
  // block tags (draftjs-to-html blockTypesMapping)
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  // inline styles
  "strong",
  "em",
  "ins",
  "del",
  "sub",
  "sup",
  "code",
  "span",
  "div",
  "br",
  // entities
  "a",
  "img",
  "iframe",
];

const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "class",
  "data-mention",
  "data-value",
  "src",
  "alt",
  "title",
  "style",
  "width",
  "height",
  "frameborder",
];

export const sanitizeHtml = (dirty: string): string =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Drop javascript:/data: sources rather than relying on defaults alone.
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel):|[^a-z0-9+.-]|[a-z0-9+.-]+(?:[^a-z0-9+.-:]|$))/i,
  });
