
var INDENT = 4, LAST_INDENT = 24; 

function log (m) {
  // node.stdio.writeError("option-help: " +m+"\n\n");
};

exports.help = function () {
  // output the usage, and then defer the token explanations
  
  var output = [this.banner()];
  for (var i in this._data) if (this._data.hasOwnProperty(i)) {
    var data = this._data[i];
    if (data.hasOwnProperty("tokens")) {
      log("calling help on tokens");
      var h = help(data.tokens);
      log("h was: "+typeof(h));
      output.push(h);
    }
  }
  
  node.stdio.write(output.join("\n\n"));
};
exports.banner = function () {
  return banner.call(this, this._data);
};


function banner (data) {
  var help = [], usage = [], out = [];
  for (var i in data) if (data.hasOwnProperty(i)) {
    if (data[i].hasOwnProperty("help")) help.push(data[i].help);
    usage.push(i);
  }
  usage = (usage.length > 1 ? "usage: \n" : "usage: ") + usage.join("\n");
  help = help.join("\n");
  out = [help, usage];
  
  return out.join("\n");
};

function help (stuff, depth) {
  // stuff is either a bag of tokens, or a bag of options
  // log("help " + stuff + " "+depth);
  depth = depth || 0;
  var out = [];
  for (var i in stuff) if (stuff.hasOwnProperty(i)) {
    var thing = stuff[i];
    if (typeof(thing) === "string") {
      log("--> format "+i+" "+thing+" "+depth);
      out.push(format(i, thing, depth));
      continue;
    }
    log("--> format "+i+" "+(thing.help||'')+" "+depth);
    out.push(format(i, thing.help || '', depth));
    
    ["options", "tokens"].forEach(function (which) {
      if (thing.hasOwnProperty(which)) out.push(help(thing[which], depth + 1));
    });
  }
  // log("help, returning: "+out.join(",").substr(0, 15));
  return out.join("\n");
};

function format (key, val, depth) {
  depth = depth || 0;
  var out = Array(depth * INDENT).join(" ") + key;
  // log("-->formatting "+out);
  if (out.length > (LAST_INDENT - 2) && val) {
    out += "\n" + Array(LAST_INDENT).join(" ");
    // log("-->formatting "+out);
  } else {
    out += Array(LAST_INDENT - out.length).join(" ");
    // log("-->formatting "+out);
  }
  out += val;
  // log("-->formatting "+out);
  return out;
};

