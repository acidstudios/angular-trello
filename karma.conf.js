module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'src/*.js',
            'test/**/*.spec.js'
        ],
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};
