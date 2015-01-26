module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				},
				files: {
					'dist/angular-trello.min.js': ['src/angular-trello.js']
				}
			},
			src: {
				options: {
					beautify: true,
					compress: false,
					preserveComments: 'all',
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				},
				files: {
					'dist/angular-trello.js': ['src/angular-trello.js']
				}
			}
		},
		jshint: {
			jshintrc: '.jshintrc',
			gruntfile: {
				src: 'Gruntfile.js'
			},
			source: {
				src: ['src/**/*.js', 'test/**/*.js']
			},
			options:{
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
				},
			} ,
		},
		watch: {
	      gruntfile: {
	        files: '<%= jshint.gruntfile.src %>',
	        tasks: ['jshint:gruntfile']
	      },
	      dist: {
	        files: '<%= jshint.source.src %>',
	        tasks: ['jshint', 'uglify:dist', 'uglify:src']
	      }
	    },
		serve: {
			options: {
				port: 9000,
				path: '/test/dom'
			}
		},
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            ci: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
	});

    grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['jshint', 'uglify:dist', 'uglify:src']);
};
