import {withPluginApi} from 'discourse/lib/plugin-api';
import ComposerController from 'discourse/controllers/composer';

function initializeTabs(api) {
  api.decorateCooked(
    $elem => {
      const radTabsElements = $elem.find(`.rad-tabs-element`);

      radTabsElements.each(function() {
        const radTabsElement = $(this);
        const tabs = radTabsElement.find(`.rad-tab-element`);
        const inner = $(`<div class='p-button-group__inner'>`);
        radTabsElement.append(inner);
        const buttons = $(`<div class='p-button-group__buttons'>`);
        radTabsElement.append(buttons);
        radTabsElement.addClass('p-button-group');

        tabs.each(function() {
          const tab = $(this);
          const icon = tab.data('icon');
          const text = tab.find(`p`).text();
          const i = $(`<i class="p-icon--${icon}"></i><span>${text}</span>`);

          tab.find(`p`).remove();
          tab.addClass('p-button-group__button');
          tab.addClass('is-smaller');
          tab.removeAttr('data-icon');
          tab.append(i);
        });

        radTabsElement.prepend($(`</div></div>`));
      });
    },
    {id: 'discourse-rad-plugin-tabs'}
  );

  api.addToolbarPopupMenuOptionsCallback(() => {
    return {
      action: 'insertTabs',
      icon: 'caret-right',
      label: 'tabs.title'
    };
  });

  ComposerController.reopen({
    actions: {
      insertTabs() {
        this.get('toolbarEvent').applySurround(
          '[tabs name="criteria"]\n[tab value="value" icon="icon"]',
          '[/tab]\n[/tabs]',
          'insert_tabs'
        );
      }
    }
  });
}

export default {
  name: 'discourse-rad-plugin-apply-tabs',

  initialize() {
    withPluginApi('0.8.7', initializeTabs);
  }
};
