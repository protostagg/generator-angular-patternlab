'use strict';
'use strict';
var path = require('path');
var url = require('url');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = generators.Base.extend({
  promptUser: function () {
    var done = this.async();

    var prompts = [{
        name: 'appName',
        message: 'What is your app\'s name ?'
      },
      {
        type: 'rawlist',
        name: 'addDemoSections',
        message:'Would you like me to pre-fill your project with some code?',
        choices: [
            'N - None',
            'Y - Example Pattern',
            'Y - Full Demo'
        ],
        store: true
      },
      {
        type:'confirm',
        name:'serverInstall',
        message:'Do you want a simple express server added?',
        default: true
      },
      {
        type:'text',
        name:'serverPort',
        message:'What port would you like to use?',
        default: '3000'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.addDemoSections = props.addDemoSections;
      this.serverInstall = props.serverInstall;
      this.serverPort = props.serverPort;

      done();
    }.bind(this));
  },

  writing: {
    projectFiles: function () {
      this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('', 'package.json'),
          {}
      );
      this.fs.copy(
          this.templatePath('_gitignore'),
          this.destinationPath('', '.gitignore')
      );
      this.fs.copy(
          this.templatePath('_gulpfile.js'),
          this.destinationPath('', 'gulpfile.js')
      );
      this.fs.copyTpl(
          this.templatePath('_server.js'),
          this.destinationPath('', 'server.js'),
          {
              serverPort: this.serverPort
          }
      );
      this.fs.copy(
          this.templatePath('_README.md'),
          this.destinationPath('', 'README.md')
      );
    },
    rootFiles: function(){
      this.fs.copyTpl(
          this.templatePath('app/_index.html'),
          this.destinationPath('app/', 'index.html'),
          {
            title: this.appName,
            appName: _.camelCase(this.appName)
          }
      );
      this.fs.copyTpl(
          this.templatePath('app/_bower.json'),
          this.destinationPath('app/', 'bower.json'),
          {
              appName: _.camelCase(this.appName)
          }
      );
    },
    appFiles: function() {
        var destinationPath = 'app/app.'+_.camelCase(this.appName)+'/';
        this.fs.copyTpl(
            this.templatePath('app/app.styleGuide/_app.module.js'),
            this.destinationPath(destinationPath, 'app.module.js'),
            {
                appName: _.camelCase(this.appName)
            }
        );
        this.fs.copyTpl(
            this.templatePath('app/app.styleGuide/_app.config.js'),
            this.destinationPath(destinationPath, 'app.config.js'),
            {
                appName: _.camelCase(this.appName)
            }
        );
    }
  }

});

