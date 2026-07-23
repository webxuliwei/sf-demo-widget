import HomePage from './pages/HomePage'
const SDK = (window as any).__RISE_SDK__
if (SDK) SDK.createPlugin({
  name: 'demo-widget', version: '0.1.0', displayName: '演示组件', icon: 'box',
  scopes: [{ scope: 'platform', viewport: 'console', title: '演示组件', icon: 'box' }],
  menus: [{ name: 'home', title: '首页', path: '/rise.io/v1/demo-widget/home', icon: 'home', scope: 'platform', group: '演示', order: 100 }],
  components: { Home: HomePage },
})
