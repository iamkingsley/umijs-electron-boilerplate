// ref: https://umijs.org/config/
export default {
  publicPath: './',
  runtimePublicPath: true,
  base: '/',
  outputPath: '../../app/dist/renderer',
  treeShaking: true,
  history: 'hash',
  hash: true,
  // exportStatic: {
  //   dynamicRoot: true,
  //   htmlSuffix: true,
  // },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false, //{ webpackChunkName: true },
        title: 'P.O.S System',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /utils\//,
            /data\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,

            /components\//,
          ],
        },
      },
    ],
  ],
};
