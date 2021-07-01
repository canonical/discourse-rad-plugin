import {withPluginApi} from 'discourse/lib/plugin-api';
import ComposerController from 'discourse/controllers/composer';

function initializeContent(api) {
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
          '[content name="value1,value2" name2="value1,value2"]',
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
