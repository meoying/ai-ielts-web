import { defineConfig } from '@umijs/max';

export const serverRoutes = [
  { path: '/', component: './Writing' },
  // 用户相关
  { path: '/user/login', component: './User/Login' },
  { path: '/mock', component: './Mock' },
  { path: '/writing', component: './Writing' },
  { path: '/user/signup', component: './User/Signup' },
];

let BASE_URL = '';
let publicPath = '/';
switch (process.env.BUILD_ENV) {
  case 'dev':
    BASE_URL = `http://localhost:8080`; //开发
    // BASE_URL = `https://api.meoying.com/interview`; //开发
    break;
  case 'test':
    BASE_URL = `https://i.meoying.com/api`; //测试
    break;
  case 'pre':
    BASE_URL = `https://i.meoying.com/api`; //预发
    break;
  case 'pro':
    BASE_URL = `https://api.meoying.com/interview`; //正式
    publicPath = `https://cdn.meoying.com/interview-static/`;
    break;
  default:
    BASE_URL = `/`; //开发
    break;
}
console.log(BASE_URL, publicPath);
process.env.BASE_URL = BASE_URL;
export default defineConfig({
  antd: {
    // dark: true,
    // compact: true,
    // appConfig:{
    // }
    theme: {
      token: {
        colorPrimary: '#4458FE',
      },
    },
    configProvider: {},
  },

  publicPath: publicPath,

  access: {},
  model: {},
  dva: {},
  initialState: {},
  request: {
    dataField: 'data',
  },
  layout: {},
  routes: [
    ...serverRoutes,
  ],

  npmClient: 'pnpm',
  title: 'AI IELTS',
  proxy: {
    '/api': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    // 'dev-api': {
    //   target: 'https://apis.xxx.cn/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/dev-api': '' },
    // },
  },
  clickToComponent: {},
  define: {
    'process.env': process.env,
  },
  chainWebpack(memo, { env, webpack }) {
    // console.log(memo.output)
    memo.output
      .filename(`[name].[contenthash:8].js`)
      .chunkFilename(`[name].[contenthash:8].chunk.js`);
    // 添加额外插件
    // memo.plugin('hello').use(Plugin, [...args]);
  },
  extraPostCSSPlugins: [
    require('tailwindcss')({
      config: './tailwind.config.js',
    }),
  ],
  tailwindcss: {},
});
