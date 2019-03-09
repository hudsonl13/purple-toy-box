var object = {};

object.checkLogin = function(req , res , next)
{
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
}

module.exports = object;
