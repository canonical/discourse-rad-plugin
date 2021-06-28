import {withPluginApi} from 'discourse/lib/plugin-api';
import ComposerController from 'discourse/controllers/composer';

function initializeContent(api) {
  api.decorateCooked(
    $elem => {
      const radContents = $elem.find(`.rad-element`);

      radContents.each(function() {
        const radContent = $(this);
        const versions = radContent.data('versions');
        const classesList = versions.split(',');

        for (let i = 0; i < classesList.length; i++) {
          radContent.addClass(classesList[i]);
        }

        radContent.removeAttr('data-versions');
      });
    },
    {id: 'discourse-rad-plugin-content'}
  );

  api.addToolbarPopupMenuOptionsCallback(() => {
    return {
      action: 'insertDiv',
      icon: 'caret-right',
      label: 'content.title'
    };
  });

  ComposerController.reopen({
    actions: {
      insertDiv() {
        this.get('toolbarEvent').applySurround(
          '[content versions="classes"]',
          '[/content]',
          'insert_content'
        );
      }
    }
  });
}

export default {
  name: 'discourse-rad-plugin-apply-content',

  initialize() {
    withPluginApi('0.8.7', initializeContent);
  }
};
