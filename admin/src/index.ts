import { ClymGuideLink } from './components/ClymGuideLink';

export default {
  register(app: any) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'clym-cmp-guide',
      Component: ClymGuideLink,
    });
  },
};
