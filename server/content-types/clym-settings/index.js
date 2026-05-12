'use strict';

module.exports = {
  schema: {
    kind: 'singleType',
    collectionName: 'clym_settings',
    info: {
      singularName: 'clym-setting',
      pluralName: 'clym-settings',
      displayName: 'Clym CMP Settings',
      description: 'Configure your Clym Widget ID. Setup guide: https://knowledge.clym.io/en/article/clym-plugins-jeagzs/',
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      'content-manager': { visible: true },
      'content-type-builder': { visible: false },
    },
    attributes: {
      clymWidgetId: {
        type: 'string',
        required: true,
        minLength: 10,
      },
    },
  },
};
