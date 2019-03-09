// Set additional environment variables
require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const productRoutes = require("./routes/products");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var middleware = require("./middleware");

const app = express();

app.set("view engine" , "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Passport configuration
app.use(require("express-session")(
{
    secret: process.env.PASSPORT_SECRET ,
    resave: false ,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res , next)
{
    res.locals.currentUser = req.user;
    next();
});

// Set routes
app.get("/" , function(req , res)
{
    res.render("index");
});

app.get("/sobre" , function(req , res)
{
    res.render("about");
});

app.get("/contato" , function(req , res)
{
    res.render("contact");
});

app.get("/top-secret-area" , function(req , res)
{
    res.render("top-secret-area");
});

app.post("/top-secret-area" , function(req , res)
{
    var user = new User({username: req.body.username});
    console.log(req.body.password);

    User.register(user , req.body.password , function(err , user)
    {
        if (err)
        {
            console.log(err);
            return res.redirect("/top-secret-area");
        }

        passport.authenticate("local")(req , res , function()
        {
            res.redirect("/admin-panel");
        });
    });
});

app.get("/login" , function(req , res)
{
    res.render("login");
});

app.post("/login" , passport.authenticate("local" ,
{
    successRedirect: "/admin-panel" ,
    failureRedirect: "/login"
}));

app.get("/logout" , function(req , res)
{
    req.logout();
    res.redirect("/login");
});

app.get("/admin-panel" , middleware.checkLogin , function(req , res)
{
    res.render("admin-panel");
});

app.use("/api/products" , productRoutes);

// Start the web server
app.listen(process.env.PORT || 8080 , function()
{
    console.log("Server started.");
});
