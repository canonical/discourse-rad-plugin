import {withPluginApi} from 'discourse/lib/plugin-api';
import ComposerController from 'discourse/controllers/composer';

function initializeDropdowns(api) {
  api.decorateCooked(
    $elem => {
      const radDropdownsElements = $elem.find(`.rad-dropdowns-element`);

      radDropdownsElements.each(function() {
        const radDropdownsElement = $(this);
        const options = radDropdownsElement.find(`.rad-element`);
        const header = $(`<div class='p-code-snippet__header'></div>`);
        const title = $(`<h5 class='p-code-snippet__title'></h5>`);
        const dropdowns = $(`<div class='p-code-snippet__dropdowns'></div>`);

        radDropdownsElement.addClass('p-code-snippet');
        title.append(radDropdownsElement.attr('data-title'));
        radDropdownsElement.removeAttr('data-title');
        header.append(title);

        const dropdownSettings = getDropdownSettings(options);
        for (let i = 0; i < dropdownSettings.length; i++) {
          const dropdownName = dropdownSettings[i].name;
          const dropdown = $(`<select name="${dropdownName}"></select>`);
          const dropdownOptions = dropdownSettings[i].options;

          dropdown.addClass(`rad-dropdown-${dropdownName}`);
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

        options.each(function() {
          const option = $(this);
          option.addClass('p-code-snippet__block');
        });

        radDropdownsElement.prepend(header);
      });
    },
    {id: 'discourse-rad-plugin-dropdowns'}
  );

  api.addToolbarPopupMenuOptionsCallback(() => {
    return {
      action: 'insertDropdowns',
      icon: 'caret-right',
      label: 'dropdowns.title'
    };
  });

  ComposerController.reopen({
    actions: {
      insertDropdowns() {
        this.get('toolbarEvent').applySurround(
          '[dropdowns title="Title"]\n[option name="value"]',
          '[/option]\n[/dropdowns]',
          'insert_dropdowns'
        );
      }
    }
  });
}

function getDropdownSettings(options) {
  let dropdownSettings = [];
  let attributesList = [];

  options.each(function() {
    const option = $(this);
    const attributes = option.data();
    let dropdownsOrder = [];

    for (const attributeName in attributes) {
      let attributeValue = option.data(attributeName);

      if (!(attributeName in attributesList)) {
        dropdownsOrder.push(attributeName);
        attributesList[attributeName] = [];
      }

      if (attributesList[attributeName].indexOf(attributeValue) === -1) {
        attributesList[attributeName].push(attributeValue);
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
  name: 'discourse-rad-plugin-apply-dropdowns',

  initialize() {
    withPluginApi('0.8.7', initializeDropdowns);
  }
};
