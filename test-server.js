var web = require("myclinic-web");
var subapp = require("./index.js");

var sub = {
	name: "pharmadrug",
	module: subapp,
	configKey: "pharmadrug"
};

web.cmd.runFromCommand([sub], {port: 9004, usePrinter: false});
