// Set additional environment variables
require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const productRoutes = require("./routes/products");

const app = express();

app.set("view engine" , "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

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

app.post("/email" , function(req , res)
{
    let transporter = nodemailer.createTransport(
    {
        host: "smtp-mail.outlook.com" ,
        port: 587 ,
        secure: false , // True for 465, false for other ports
        tls:
        {
            ciphers:'SSLv3'
        } ,
        auth:
        {
            user: process.env.OUTLOOK_USER ,
            pass: process.env.OUTLOOK_PASSWORD
        }
    });

    // Setup email data with unicode symbols
    let mailOptions =
    {
        from: "Nodemailer <yurigamesloja@outlook.com>" , // Sender address
        to: "yurigamesloja@outlook.com" , // List of receivers
        subject: req.body.subject , // Subject line
        text: req.body.message + "\n" + req.body.name + " - " + req.body.emailAddress , // Plain text body
        html: req.body.message + "<br><br><b>" + req.body.name + " - " + req.body.emailAddress + "</b>" // HTML body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions , function(error , info)
    {
        if (error)
        {
            res.render("email" , {message: "Erro ao enviar email. Tente novamente!"});
        }
        else
            res.render("email" , {message: "Email enviado com sucesso!"});
    });
});

app.get("/login" , function(req , res)
{
    res.render("login");
});

app.post("/login" , function(req , res)
{

});

app.get("/admin" , function(req , res)
{
    res.render("admin");
});

app.use("/api/products" , productRoutes);

// Start the web server
app.listen(process.env.PORT || 8080 , function()
{
    console.log("Server started.");
});
