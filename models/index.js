var mongoose = require("mongoose");
var databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/purple-toy-box";

// mongoose.set("debug" , true);

mongoose.connect(databaseUrl);

mongoose.Promise = Promise;

module.exports.Product = require("./product");
module.exports.User = require("./user");
