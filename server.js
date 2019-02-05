const express = require("express");

const app = express();

app.set("view engine" , "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Set routes
app.get("/" , function(req , res)
{
    res.render("index.ejs");
});

app.get("/sobre" , function(req , res)
{
    res.render("about.ejs");
});

app.get("/contato" , function(req , res)
{
    res.render("contact.ejs");
});

// Start the web server
app.listen(process.env.PORT || 8080 , function()
{
    console.log("Server started.");
});
