// npm --help
// 
// npm - The Node Package Manager
// usage: npm [npm-options] <command>
// 
// [npm-options]               Options to be passed to the npm progam itself.
// 
//     -d --dry-run            Don't do anything real
// 
//     -h --help               Show this message
// 
//     -v --verbose            Show more output
//                             
// <command>                   The thing you want npm to do
// 
//     install <package> [install-options]
//                             Install a package
// 
//         <package>           The package to install
// 
//         [install-options]
// 
//             -b --branch ( stable | edge | nightly )
//                             Which branch to install
// 
//             -f --force      Install even if requirements are not met.
// 
//             -v --version    Which specific version to install
//        
//     set <package> [<setting> [...]]
//                             Manage package configurations
// 
//         <package>           The package to update or view settings on
//
//         <setting>           A set of either 'key=value' pairs, or just key names.
//                             Keys without values are displayed with their current values.
//                             If no keys are specified, then all settings for the package
//                             are printed.
//         
//     remove <package> [remove-options]
//                             Uninstall a package
//
//         <package>           The package to remove
//
//         [remove-options]
// 
//             -f --force      Remove even if something else requires it.
// 
//             -c --cleanup    Remove packages installed as dependencies which are no
//                             longer needed
//        
//     ( start | stop | restart ) <package>
//                             Execute package start/stop/restart commands
// 
//         <package>           The package to start, stop, or restart.
        

function method (o, fn) { return function () { return o[fn].apply(o, arguments) } };

p = args.Parser({
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
          }
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
})
p.parse(ENV.ARGV)

// npm install foo -f --version 1.2.3
// calls:
npm.install({
  "command" : "install foo -f --version 1.2.3",
  "package" : "foo",
  "install-options" : "-f --version 1.2.3",
  "force" : true,
  "version" : "1.2.3"
});

// npm set foo bar=baz quux=asdf bla bloo
// calls:
npm.set({
  "command" : "set foo bar=baz quux=asdf bla bloo",
  "package" : "foo",
  "setting" : [
    "bar=baz", "quux=asdf", "bla", "bloo"
  ]
});

// npm restart foo --blalrah fboro
// calls:
npm.stopStart({
  "command" : "restart foo",
  "( start | stop | restart )" : "restart"
  "package" : "foo",
  // the leftovers
  "0" : "--blalrah",
  "1" : "fboro"
});

// npm -h
// calls:
p.help({"help" : true}); // prints the banner for this parser.


// npm install -v 1.2
// This is an error!
// print the usage token string for where we encountered the error.
throw Error("Required token: <package> not supplied\n"+
  "Usage: npm [npm-options] install <package> [install-options]");



