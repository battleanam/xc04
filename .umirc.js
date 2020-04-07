// ref: https://umijs.org/config/

export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/LoginLayout/index',
    },
    {
      path: '/home',
      component: '../layouts/BasicLayout/index',
      routes: [
        { path: '/home', component: '../pages/Home/index' },
        { path: '/home/insect', component: '../pages/Insect/index' },
      ],
    },
  ],
  proxy: {
    '/Su': {
      target: 'http://lrc.nirain.com',
      changeOrigin: true,
    },
    '/img/': {
      target: 'http://124.128.96.67:5000',
      changeOrigin: true,
      pathRewrite: { '^/img': '' },
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'bz-frant',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  theme: {
    'primary-color': '#52c41a',
  },
};
