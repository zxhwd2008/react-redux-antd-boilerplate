var webpackConfig = require('./webpack.config.dev.js')

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    // karma only needs to know about the test bundle
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/test/tests.bundle.js'
    ],
    frameworks: [ 'chai', 'mocha', 'sinon' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'src/test/tests.bundle.js': [ 'webpack', 'sourcemap' ],
    },
    client: {
      captureConsole: true,
    },
    reporters: ['progress'],
    // webpack config object
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
  })
}
