# strapi-plugin-clym-cmp

[Clym CMP](https://clym.io) integration for [Strapi v4](https://strapi.io).

Stores your Clym Widget ID in Strapi and automatically injects the Clym consent widget scripts into any HTML responses your Strapi instance serves.

**Full setup guide:** https://knowledge.clym.io/en/article/clym-plugins-jeagzs/

## Requirements

- Strapi v4
- Node.js 18+

## Installation

```bash
npm install strapi-plugin-clym-cmp
```

Then add the plugin to `config/plugins.js`:

```js
module.exports = {
  'clym-cmp': { enabled: true },
};
```

Restart Strapi.

## Configuration

1. In the Strapi admin panel, go to **Content Manager → Clym CMP Settings**
2. Click **Create an entry**
3. Enter your **Widget ID** — log in at [auth.clym.io](https://auth.clym.io) to find it in your dashboard. Don't have an account? Register at [register.clym.io](https://register.clym.io)
4. Click **Save**

The plugin injects the Clym scripts immediately after `<head>` on all HTML responses (admin routes excluded). Changes to the Widget ID take effect instantly — no restart needed.

## How it works

### HTML middleware (automatic)

When Strapi serves an HTML page, the plugin injects synchronous script tags right after `<head>`:

```html
<script src='https://config.clym-widget.net/v2/YOUR-WIDGET-ID.js'></script>
<script src='https://widget-next.clym-sdk.net/v2/stub.js' data-property='YOUR-WIDGET-ID'></script>
```

### Frontend frameworks (Next.js, Nuxt, etc.)

If you're using Strapi as a headless API, fetch the Widget ID and inject the scripts in your frontend's `<head>`:

```js
// Fetch from Strapi Content API
const res = await fetch('/api/clym-setting?fields[0]=widgetId')
const { data } = await res.json()
const widgetId = data?.attributes?.widgetId
```

Then inject the two `<script>` tags synchronously (no `defer` or `async`) in your layout.

## Support

https://knowledge.clym.io/en/
