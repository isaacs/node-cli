function method (o, fn) { return function () { return o[fn].apply(o, arguments) } };

var npm = {};

var Parser = require("../lib/options.js").Parser;

var p = Parser({
  "npm [npm-options] <command>": {
    help: "npm - The Node Package Manager",
    tokens: {
      "[npm-options]": {
        help: "Options to be passed to the npm program itself",
        options: {
          "-d --dry-run": "Don't do anything real",
          "-h --help": {
            help: "Show this message",
            action: method(p, "help")
          },
          "-v --verbose": "Show more ouput"
        }
      },
      "<command>": {
        help: "The thing you want npm to do",
        options: {
          "install <package> [install-options]": {
            help: "Install a package",
            tokens: {
              "<package>": "The package to install",
              "[install-options]": {
                options: {
                  "-b --branch ( stable | edge | nightly )": "The branch to install",
                  "-f --force": "Install even if requirements are not met.",
                  "-v --version <version>": "Which specific version to install"
                }
              }
            },
            action: method(npm, "install")
          },
          "set <package> [ <setting> [...]]": {
            help: "Manage package configurations",
            tokens: {
              "<package>": "The package to update or view settings on",
              "<setting>": "A set of either 'key=value' pairs or just key names. " +
              "Keys without values are displayed with their current values. " +
              "If no keys are specified, then all settings for the package are printed."
            },
            action: method(npm, "set")
          },
          "remove <package> [remove-options]": {
            help: "Remove a package",
            tokens: {
              "<package>": "The package to remove",
              "[remove-options]": {
                options: {
                  "-f --force": "Remove even if it would break something else",
                  "-c --cleanup": "Remove packages installed as dependencies which are no longer needed"
                }
              }
            },
            action: method(npm, "remove")
          },
          "( start | stop | restart ) <package>": {
            help: "Execute package start/stop/restart commands",
            tokens: {
              "<package>": "The package to start, stop, or restart."
            },
            action: method(npm, "stopStart")
          }
        }
      }
    }
  }
});

p.help();