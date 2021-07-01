export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.allowList(['div.rad-dropdowns-element', 'div.rad-element', 'div.rad-tabs-element', 'div.rad-tab-element', 'div.p-button-group__inner', 'div.p-button-group__buttons']);

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
        token.attrs = [['class', 'rad-element']];

        for (let key in tag.attrs) {
          token.attrs.push([`data-${key}`, tag.attrs[key]]);
        }

        return true;
      }
    });

    ruler.push('content', {
      tag: 'content',
      wrap: (token, tag) => {
        token.attrs = [['class', 'rad-element']];

        for (let key in tag.attrs) {
          token.attrs.push([`data-${key}`, tag.attrs[key]]);
        }

        return true;
      }
    });

    ruler.push('tabs', {
      tag: 'tabs',
      wrap: (token, tag) => {
        token.attrs = [['class', 'rad-tabs-element']];

        if ("name" in tag.attrs) {
          token.attrs.push([`data-name`, tag.attrs.name]);
        }

        return true;
      }
    });

    ruler.push('tab', {
      tag: 'tab',
      wrap: (token, tag) => {
        token.attrs = [['class', 'rad-tab-element']];

        if ("value" in tag.attrs) {
          token.attrs.push([`data-value`, tag.attrs.value]);
        }

        if ("icon" in tag.attrs) {
          token.attrs.push([`data-icon`, tag.attrs.icon]);
        }

        return true;
      }
    });
  }

  helper.registerPlugin(setupRad);
}
