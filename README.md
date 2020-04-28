# grunt-standard-version

Grunt.js plugin with automatic versioning (using [semver](https://github.com/semver/semver)) and CHANGELOG generation (using [standard-version](https://github.com/conventional-changelog/standard-version))

## Getting Started

This plugin requires **Grunt** `1.1.0` (it may work with some older versions, though not tested) and is integrating **standard-version** `v7.1.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, please check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin following the instructions below.

## Conventional installation

This Grunt plugin should be installed as a development dependency of your project:

```shell
npm install --save-dev khatastroffik/grunt-standard-version 
```

In your project's `Gruntfile.js`, add a section named `standardVersion` to the data object passed into `grunt.initConfig()`. At least one target (e.g. `version` below) must be defined. This target will be executed by default if no target is explicitly specified when the task is called:

```js
grunt.initConfig({

  //...

  standardVersion: {
    options: {
      // define the DEFAULT options for ALL targets here
    },
    version: {
      options: {
        // define the options SPECIFIC to THIS target here
      }
    }
  },

  //...

});
```
note: if multiple targets are defined and the task call doesn't specify any target, then ALL the defined targets will be executed in a row.

To enable i.e. **load** the plugin, add the following inside your `Gruntfile.js` file (usually after the configuration above):

```js
// load the plugin
grunt.loadNpmTasks('grunt-standard-version');
```

To integrate the task i.e. in order to have it called in some workflow, you may also define further (kind of *meta*) tasks like the following:

```js
grunt.registerTask('versionize', ['standardVersion:version']); // call the task with target 'version'
grunt.registerTask('test-versionize', ['clean', 'versionize', 'nodeunit']); // call the 'versionize' task above

grunt.registerTask('release', ['SOME-TASK-HERE', 'standardVersion:version', 'SOME-TASK-THERE']);
```

To make the grunt (meta) tasks available per npm, you may add some scripts in your `package.json`file. E.g.:

```json

"scripts": {
  "test-versionize": "grunt test-versionize",
  "versionize": "grunt versionize",
  "release": "grunt release"
}

```


## Options

### Grunt plugin specific option

There's only one specific option `continueIfError` (default = `false`) that allows Grunt to keep running following tasks in case "standard-version" has failed - if set to `true`.

### standard-version specific options

All the options declared in `standard-version` v7.1.0 are valid.

Overview:

|option|default/example|short description
|------|---------------|-----------------
|infile| "CHANGELOG.md"|name of the file used to track the changelog
|releaseCommitMessageFormat|"&#123;&#123;currentTag&#125;&#125;"| the message of the commit (the old "message" option is deprecated). Placeholder "&#123;&#123;currentTag&#125;&#125;" is allowed. Current default is `chore(release): &#123;&#123;currentTag&#125;&#125;`
|header|"EXAMPLE HEADER"|headline for the list of changes ('header' is the replacement for the DEPRECATED 'changelogHeader')
|packageFiles|[]|list of files that will be scanned to find the 'current version' information. First version found wins!
|bumpFiles|[]|list of files (note: the listed 'packageFiles' will be added internally/automatically to the 'bumpFiles' list) in which the 'current version' information should be bumped
|firstRelease|false|set to true for the very first release
|sign|false|true if a signature should be used to sign the commits...
|noVerify|false|if true, existing git hooks will be bypassed
|commitAll|false|if true, all staged files (beside the changelog and bumpfiles) will be added to the commit
|silent|false|true to avoid displaying any message to console etc.
|tagPrefix|"v"|bump will use this to prefix the new version number
|scripts|&#123;	&#125;|see standard-version docs
|skip|&#123;	&#125;|see standard-version docs
|gitTagFallback|true|if no meta-information file is found (e.g., package.json), a fallback 'version' should be used
|releaseAs|""|Specify the release type manually (like "major", "minor", "patch" or a custom value like "1.0")
|path|""|Only populate commits with files added, modified... under this path
|preset|"angular"|Commit message guideline preset (undefined by default). many different presets exist. see standard-version documentation
|verbose|false|output extra log information to console...
|dryRun|false|simulate if set to true

Further details: see [standard-version default configuration](https://github.com/conventional-changelog/standard-version/blob/master/defaults.js) and [standard-version commands](https://github.com/conventional-changelog/standard-version/blob/master/command.js) among others.

### Example

This is an example of the **standardVersion** task configuration using a target named "version".

```js
grunt.initConfig({

  //...
  standardVersion: {
    options: {
      releaseCommitMessageFormat: 'SuperProject {{currentTag}}',
      prerelease: 'alpha',
      silent: true,
      header: '# This is the changelog of the SuperProject\n\n',
      tagPrefix: "version-",
      releaseAs: 'major',
      preset: 'angular',
      dryRun: true
    },
    version: { 
      options: {
        dryRun: false
      }
    }
  },
  //...

});
```

Executing the task `standardVersion:version` as defined above will result in:

- reduced task output to the console
- all bump files updated to the next *major* version, including a pre-release value e.g. from `1.3.0` to `2.0.0-alpha.0`
- CHANGELOG.md will be updated according the 'angular' preset with a header as declared above
- all bumpfiles and the changelog will be commited with the message `SuperProject version-2.0.0-alpha.0`
- a tag will be created as `version-2.0.0-alpha.0`

