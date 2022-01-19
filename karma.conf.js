const webpackConfig = require('./webpack.dev.config');

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'webpack'
    ],

    // list of files / patterns to load in the browser
    files: [
      'test/**/*.ts',
      'test/**/*.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.ts': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: webpackConfig.mode,
      devtool: webpackConfig.devtool,
      optimization: {
        splitChunks: false // https://github.com/ryanclark/karma-webpack/issues/493#issuecomment-780411348
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // specReporter: {
    //   suppressErrorSummary: false,  // do not print error summary 
    //   suppressFailed: false,  // do not print information about failed tests 
    //   suppressPassed: true,  // do not print information about passed tests 
    //   suppressSkipped: true,  // do not print information about skipped tests 
    //   showSpecTiming: false  // print the time elapsed for each spec 
    // },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome',
      'ChromeHeadless',
      'Firefox',
      'FirefoxHeadless',
      // 'Safari',
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
