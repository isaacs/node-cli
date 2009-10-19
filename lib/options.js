// Each level follows the format of:
// 
// "string of tokens" : { optionDescription }
// 
// optionDescription ==> { tokens : { "token" : { tokenDescription } } }
// tokenDescription ==> { options : { "option" : { optionDescription } } }

function Parser (data) {
  if (!(this instanceof Parser)) return new Parser(data);
  this._data = data;
};
exports.Parser = Parser;
node.mixin(Parser.prototype, require("./option-help.js"));
