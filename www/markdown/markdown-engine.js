var MarkdownEngine = (function () {
  'use strict';

  var _hooksReady = false;
  var _removed = 0;

  function _marked() {
    return typeof marked !== 'undefined' ? marked : null;
  }

  function _purify() {
    return typeof DOMPurify !== 'undefined' ? DOMPurify : null;
  }

  function _katex() {
    return typeof katex !== 'undefined' ? katex : null;
  }

  function isAvailable() {
    return !!_marked() && !!_purify();
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function _isSafeLink(href) {
    var h = String(href || '').replace(/^\s+|\s+$/g, '');
    if (!h) return false;
    if (h.charAt(0) === '#') return true;
    if (h.indexOf('//') === 0) return false;
    if (/^(https?:|mailto:|tel:)/i.test(h)) return true;
    if (/^[a-z][a-z0-9+.-]*:/i.test(h)) return false;
    return true;
  }

  function _isSafeImage(src) {
    var s = String(src || '').replace(/^\s+|\s+$/g, '');
    if (!s) return false;
    if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(s)) return true;
    if (/^data:/i.test(s)) return false;
    if (/^https?:\/\//i.test(s)) return true;
    if (/^\/\//.test(s)) return false;
    if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return false;
    return true;
  }

  function _installHooks() {
    if (_hooksReady) return;
    var purify = _purify();
    if (!purify) return;
    _hooksReady = true;

    purify.addHook('uponSanitizeElement', function (node) {
      if (!node || !node.nodeName) return;
      if (/^(SCRIPT|IFRAME|OBJECT|EMBED|FORM|META|LINK|BASE|STYLE)$/i.test(node.nodeName)) _removed++;
    });

    purify.addHook('afterSanitizeAttributes', function (node) {
      if (!node || !node.nodeName) return;
      var tag = node.nodeName.toUpperCase();
      if (tag === 'A') {
        var href = node.getAttribute('href');
        if (href !== null && !_isSafeLink(href)) {
          node.removeAttribute('href');
          _removed++;
        } else if (href !== null) {
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', 'noopener noreferrer');
        }
      } else if (tag === 'IMG') {
        var src = node.getAttribute('src');
        if (src !== null && !_isSafeImage(src)) {
          node.removeAttribute('src');
          _removed++;
        }
        node.setAttribute('loading', 'lazy');
        node.setAttribute('referrerpolicy', 'no-referrer');
      }
      if (node.hasAttribute && node.hasAttribute('style')) node.removeAttribute('style');
    });
  }

  function sanitize(html) {
    var purify = _purify();
    if (!purify) return escapeHtml(html);
    _installHooks();
    return purify.sanitize(String(html == null ? '' : html), {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'meta', 'link', 'base'],
      FORBID_ATTR: ['style', 'srcdoc', 'formaction'],
      ALLOW_DATA_ATTR: false,
      ALLOW_UNKNOWN_PROTOCOLS: false
    });
  }

  function _protectMath(source) {
    var nonce = 'MIBMATH' + Math.random().toString(36).slice(2, 10);
    var items = [];
    var re = /```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|\$\$[\s\S]*?\$\$|\$(?:\\.|[^$\n\\])+\$/g;
    var out = String(source || '').replace(re, function (match, offset) {
      var prev = source.charAt(offset - 1);
      if (prev === '\\') return match;
      if (match.charAt(0) === '`' || match.slice(0, 3) === '~~~') return match;
      var display = match.slice(0, 2) === '$$';
      var tex = display ? match.slice(2, -2) : match.slice(1, -1);
      if (!tex.replace(/\s+/g, '')) return match;
      var ph = nonce + '_' + items.length + '_';
      items.push({ ph: ph, tex: tex, display: display });
      return ph;
    });
    return { source: out, items: items };
  }

  function _renderMath(tex, display) {
    var katex = _katex();
    if (katex && typeof katex.renderToString === 'function') {
      try {
        return katex.renderToString(tex, {
          displayMode: !!display,
          throwOnError: false,
          strict: 'ignore',
          trust: false,
          output: 'html'
        });
      } catch (e) { /* cae al texto */ }
    }
    var raw = (display ? '$$' : '$') + tex + (display ? '$$' : '$');
    return '<span class="md-math-fallback">' + escapeHtml(raw) + '</span>';
  }

  function _restoreMath(html, items, asSource) {
    if (!items.length) return html;
    items.forEach(function (it) {
      var replacement;
      if (asSource) {
        var raw = it.display ? '$$' + it.tex + '$$' : '$' + it.tex + '$';
        replacement = '<span class="md-math-source">' + escapeHtml(raw) + '</span>';
      } else {
        replacement = _renderMath(it.tex, it.display);
      }
      var solo = new RegExp('<p>\\s*' + escapeRegExp(it.ph) + '\\s*</p>', 'g');
      if (it.display) html = html.replace(solo, function () { return replacement; });
      html = html.split(it.ph).join(replacement);
    });
    return html;
  }

  function _parse(source) {
    var m = _marked();
    if (!m) return '<p>' + escapeHtml(source) + '</p>';
    return m.parse(String(source || ''), {
      gfm: true,
      breaks: false,
      headerIds: false,
      mangle: false,
      async: false
    });
  }

  function render(source) {
    var protectedSource = _protectMath(source);
    var html;
    try { html = _parse(protectedSource.source); }
    catch (e) { html = '<p>' + escapeHtml(source) + '</p>'; }
    _removed = 0;
    html = sanitize(html);
    html = _restoreMath(html, protectedSource.items, false);
    return {
      html: '<div class="md-body">' + html + '</div>',
      removed: _removed
    };
  }

  function renderForConversion(source) {
    var protectedSource = _protectMath(source);
    var html;
    try { html = _parse(protectedSource.source); }
    catch (e) { html = '<p>' + escapeHtml(source) + '</p>'; }
    html = sanitize(html);
    html = _restoreMath(html, protectedSource.items, true);
    return '<div class="md-body">' + html + '</div>';
  }

  function plainText(source) {
    var text = String(source == null ? '' : source);
    text = text.replace(/```[\s\S]*?```/g, function (m) {
      return m.replace(/^```[^\n]*\n?/, '').replace(/```\s*$/, '');
    });
    text = text.replace(/~~~[\s\S]*?~~~/g, function (m) {
      return m.replace(/^~~~[^\n]*\n?/, '').replace(/~~~\s*$/, '');
    });
    text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
    text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    text = text.replace(/^#{1,6}\s+/gm, '');
    text = text.replace(/^>\s?/gm, '');
    text = text.replace(/^\s*([-*+]|\d+\.)\s+/gm, '');
    text = text.replace(/\$\$?([\s\S]*?)\$\$?/g, '$1');
    text = text.replace(/[*_~`]/g, '');
    text = text.replace(/<[^>]*>/g, ' ');
    return text.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
  }

  return {
    isAvailable: isAvailable,
    render: render,
    renderForConversion: renderForConversion,
    plainText: plainText,
    sanitize: sanitize,
    escapeHtml: escapeHtml
  };
})();

if (typeof window !== 'undefined') window.MarkdownEngine = MarkdownEngine;
if (typeof module !== 'undefined' && module.exports) module.exports = MarkdownEngine;
