export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.allowList(['div.discourse-rad-element', 'div.js-rad-content-element', 'div.js-rad-tabs-element']);

  function setupRad(md) {
    const ruler = md.block.bbcode.ruler;

    ruler.push('tabs', {
      tag: 'tabs',
      wrap: token => {
        token.attrs = [['class', 'js-rad-tabs-element']];

        return true;
      },
      before: state => {
        state.push('div_open', 'div', 1).attrs = [['class', 'discourse-rad-element']];

        return true;
      },
      after: state => {
        state.push('div_close', 'div', -1);

        return true;
      }
    });

    ruler.push('tab', {
      tag: 'tab',
      wrap: (token, tag) => {
        token.attrs = [['class', 'js-rad-content-element']];

        for (let key in tag.attrs) {
          token.attrs.push([`data-${key}`, tag.attrs[key]]);
        }

        return true;
      }
    });
  }

  helper.registerPlugin(setupRad);
}
