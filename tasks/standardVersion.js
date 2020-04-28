/*
 * grunt-standard-version
 * https://github.com/khatastroffik/grunt-standard-version
 *
 * Copyright (c) 2020 Loïs Bégué
 * 
 * Licensed under the MIT license.
 */

'use strict';
var standard_version = require('standard-version');
const { getConfiguration } = require('standard-version/lib/configuration');

/* 
  ===================================================================
  'standard-version' applicable configuration parameters as of v7.1.0
  ===================================================================
  infile: 'CHANGELOG.md', // name of the file used to track the changelog
  releaseCommitMessageFormat: '{{currentTag}}' // the message of the commit. Available placeholder: {{currentTag}}
  header: '### EXAMPLE HEADER ###', // headline for the list of changes ('header' is the replacement for the DEPRECATED 'changelogHeader')
  packageFiles: [], // list of files that will be scanned to find the 'current version' information. First version found wins!
  bumpFiles: [], // list of files (note: the listed 'packageFiles' will be added internally/automatically to the 'bumpFiles' list) in which the 'current version' information should be bumped
  firstRelease: false, // set to true for the very first release 
  sign: false, // true if a signature should be used to sign the commits...
  noVerify: false, // if true, existing git hooks will be bypassed
  commitAll: false, // if true, all staged files (beside the changelog and bumpfiles) will be added to the commit
  silent: false, // true to avoid displaying any message to console etc.
  tagPrefix: 'v', // bump will use this to prefix the new version number
  scripts: {}, // see standard-version docs
  skip: {}, // see standard-version docs
  gitTagFallback: true, // if no meta-information file is found (e.g., package.json), a fallback 'version' should be used
  releaseAs: '', // Specify the release type manually (like npm version <major|minor|patch>)
  path: '', // Only populate commits with files added, modified... under this path
  preset: 'angular',  // Commit message guideline preset
  verbose: false, // output extra log information to console...
  dryRun: false, // simulate if true...
  =================================================================== 
*/
  
var DEFAULT_OPTIONS = {
  releaseCommitMessageFormat : 'chore(release): {{currentTag}}',
  continueIfError: false
};

module.exports = function (grunt) {

  grunt.registerMultiTask('standardVersion', 'bump your package version, update CHANGELOG and stage both', function () {
    
    var done = this.async();
    var localVersionReleaseConfig = getConfiguration();
    var opt = this.options( {...DEFAULT_OPTIONS, ...localVersionReleaseConfig} );

    function handleError(err) {
      if (opt.continueIfError) {
        grunt.log.error();
        grunt.log.error('"standard-version" failed but grunt should keep processing...');
        done();
      } else {
        done(new Error('"standard-version" failed!'));
      }
    }
    standard_version(opt)
      .then( () => {grunt.log.ok(); done() } )
      .catch(handleError);
  });
};
