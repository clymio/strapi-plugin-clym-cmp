'use strict';

let _clymWidgetId = '';

module.exports = {
  register({ strapi }) {
    strapi.server.use(async (ctx, next) => {
      await next();

      if (
        !_clymWidgetId ||
        ctx.type !== 'text/html' ||
        typeof ctx.body !== 'string' ||
        !ctx.body.includes('<head') ||
        ctx.path.startsWith('/admin')
      ) {
        return;
      }

      const scripts =
        `\n<script src='https://config.clym-widget.net/v2/${_clymWidgetId}.js'></script>\n` +
        `<script src='https://widget-next.clym-sdk.net/v2/stub.js' data-property='${_clymWidgetId}'></script>`;

      ctx.body = ctx.body.replace(/<head\b[^>]*>/i, `$&${scripts}`);
    });
  },

  async bootstrap({ strapi }) {
    const refresh = async () => {
      try {
        const row = await strapi.db
          .query('plugin::clym-cmp.clym-setting')
          .findOne({ select: ['clymWidgetId'] });
        _clymWidgetId = row?.clymWidgetId ?? '';
      } catch {
        _clymWidgetId = '';
      }
    };

    await refresh();

    strapi.db.lifecycles.subscribe({
      models: ['plugin::clym-cmp.clym-setting'],
      async afterCreate(event) {
        _clymWidgetId = event.result?.clymWidgetId ?? '';
      },
      async afterUpdate(event) {
        _clymWidgetId = event.result?.clymWidgetId ?? '';
      },
      async afterDelete() {
        _clymWidgetId = '';
      },
    });
  },

  contentTypes: require('./content-types'),
  routes: {},
  controllers: {},
  services: {},
};
