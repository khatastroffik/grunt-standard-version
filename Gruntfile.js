/*
 * grunt-standard-version
 * https://github.com/khatastroffik/grunt-standard-version
 *
 * Copyright (c) 2020 Loïs Bégué
 * 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      tests: ['tmp']
    },
    standardVersion: {
      options: {
        dryRun: true,
      },
      version: {
        options: {
          preset: 'angular',
          header: '# grunt-standard-version changelog\n\nAll notable changes to this project will be documented in this file. See [grunt-standard-version](https://github.com/khatastroffik/grunt-standard-version).\n\n'
        }
      },
      test: {
        options: {
        }
      }

    },
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'standardVersion:test', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('version', ['standardVersion:version']);
};
