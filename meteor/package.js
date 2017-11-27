// package metadata file for Meteor.js
'use strict';

var packageName = 'easylogic:summernote';  // http://atmospherejs.com/summernote:summernote
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.
var fs = Npm.require("fs");
var packageJson = JSON.parse(fs.readFileSync('package.json'));

var fontFiles = fs.readdirSync('dist/font/').map(function(it) {
  return 'dist/font/' + it; 
});

var langFiles = fs.readdirSync('dist/lang/').map(function(it) {
  return 'dist/lang/' + it; 
});

var coreFiles = fs.readdirSync('dist/').filter(function (it) {
  return it.includes('.js') || it.includes('.css');
}).map(function (it) {
  return 'dist/' + it; 
});

var summernoteFiles = langFiles.concat(coreFiles);


Package.describe({
  name: packageName,
  summary: 'summernote (official): jQuery+Bootstrap WYSIWYG editor with embedded images support',
  version: packageJson.version,
  git: 'https://github.com/summernote/summernote.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use([
    'jquery',
    'twbs:bootstrap@3.3.1'
  ], where);
  // no exports - summernote adds itself to jQuery
  api.addFiles(summernoteFiles, where);

  api.addAssets(fontFiles, where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);

  api.addFiles('meteor/test.js', where);
});
