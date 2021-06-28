export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.allowList(['div.rad-dropdowns-element', 'div.rad-option-element', 'div.rad-element']);

  function setupRad(md) {
    const ruler = md.block.bbcode.ruler;

    ruler.push('dropdowns', {
      tag: 'dropdowns',
      wrap: (token, tag) => {
        token.attrs = [['class', 'rad-dropdowns-element']];

        if (tag.attrs.title) {
          token.attrs.push(['data-title', tag.attrs.title]);
        }

        return true;
      }
    });

    ruler.push('option', {
      tag: 'option',
      wrap: (token, tag) => {
        token.attrs = [['class', 'rad-option-element']];

        for (let key in tag.attrs) {
          token.attrs.push([`data-${key}`, tag.attrs[key]]);
        }

        return true;
      }
    });

    ruler.push('content', {
      tag: 'content',
      wrap: (token, tag) => {
        if (!('versions' in tag.attrs)) {
          return true;
        }

        token.attrs = [['class', 'rad-element']];
        token.attrs.push([`data-versions`, tag.attrs.versions]);

        return true;
      }
    });
  }

  helper.registerPlugin(setupRad);
}
