node.mixin(require("../term-color.js"));
node.mixin(require("/utils.js"));

puts(color("bold green", {fg:"green",bold:1}));
puts(color("yellow on red", {fg:"yellow",bg:"red"}));
puts(color("white on blue", {fg:"white",bg:"blue"}));
puts(color("blue on white", {fg:"blue",bg:"white"}));
puts(color("black on yellow", {fg:"black",bg:"yellow"}));
puts(color("bold cyan on purple", {fg:"cyan",bg:"purple",bold:1}));
puts(color("bg black", {bg:"black"}));
puts(color("bg white", {bg:"white"}));

puts("bold green".fg("green").bold());
puts("yellow on red".fg("yellow").bg("red"));
puts("white on blue".fg("white").bg("blue"));
puts("blue on white".fg("blue").bg("white"));
puts("black on yellow".fg("black").bg("yellow"));
puts("bold cyan on purple".fg("cyan").bg("purple").bold());
puts("bg black".bg("black"));
puts("bg white".bg("white"));



// puts(green("this is green on black").on("black"));
puts("this is white on blue".fg("white").bg("blue").bold());