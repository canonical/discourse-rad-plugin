import {withPluginApi} from 'discourse/lib/plugin-api';
import ComposerController from 'discourse/controllers/composer';

function initializeTabs(api) {
  api.decorateCooked(
    $elem => {
      const radTabsElements = $elem.find(`.js-rad-tabs-element`);

      radTabsElements.each(function() {
        const radTabsElement = $(this);
        const tabs = radTabsElement.find(`.js-rad-content-element`);
        const header = $(`<div class='p-code-snippet__header'></div>`);
        const dropdowns = $(`<div class='p-code-snippet__dropdowns'></div>`);

        radTabsElement.addClass('p-code-snippet');

        const dropdownSettings = getDropdownSettings(tabs);
        for (let i = 0; i < dropdownSettings.length; i++) {
          const dropdownName = dropdownSettings[i].name;
          const dropdown = $(`<select name="${dropdownName}"></select>`);
          const dropdownOptions = dropdownSettings[i].options;

          dropdown.addClass(`js-rad-dropdown-element`);
          dropdown.addClass('p-code-snippet__dropdown');

          if (dropdownOptions.length === 0) {
            continue;
          }

          for (let i = 0; i < dropdownOptions.length; i++) {
            const optionValue = dropdownOptions[i];
            const optionLabel = optionValue.replace('-', ' ');
            const option = `<option value="${optionValue}">${optionLabel}</option>`;

            dropdown.append(option);
          }

          dropdowns.append(dropdown);
        }
        header.append(dropdowns);

        tabs.each(function() {
          const option = $(this);
          option.addClass('p-code-snippet__block');
        });

        radTabsElement.prepend(header);
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
          '[tabs]\n[tab name="value"]',
          '[/tab]\n[/tabs]',
          'insert_tabs'
        );
      }
    }
  });
}

function getDropdownSettings(tabs) {
  let dropdownSettings = [];
  let attributesList = [];

  tabs.each(function() {
    const tab = $(this);
    const attributes = tab.data();
    let dropdownsOrder = [];

    for (const attributeName in attributes) {
      let attributeValue = tab.data(attributeName);

      if (!(attributeName in attributesList)) {
        dropdownsOrder.push(attributeName);
        attributesList[attributeName] = [];
      }

      const splitValues = attributeValue.split(',');
      for (let i = 0; i < splitValues.length; i++) {
        if (attributesList[attributeName].indexOf(splitValues[i]) === -1) {
          attributesList[attributeName].push(splitValues[i]);
        }
      }
    }

    for (let i = 0; i < dropdownsOrder.length; i++) {
      dropdownSettings.unshift({
        name: dropdownsOrder[i],
        options: attributesList[dropdownsOrder[i]]
      });
    }
  });

  return dropdownSettings;
}

export default {
  name: 'discourse-rad-plugin-apply-tabs',

  initialize() {
    withPluginApi('0.8.7', initializeTabs);
  }
};
