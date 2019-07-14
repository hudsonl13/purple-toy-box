var db = require("../models");

exports.getProducts = function(req , res)
{
    db.Product.find().sort({ordinal: 1})
    .then(function(products)
    {
        res.json(products);
    })
    .catch(function(err)
    {
        res.send(err);
    });
};

exports.createProduct = function(req , res)
{
    db.Product.create(req.body)
    .then(function(newProduct)
    {
        res.status(201).json(newProduct);
    })
    .catch(function(err)
    {
        res.send(err);
    });
};

exports.getProduct = function(req , res)
{
    db.Product.findById(req.params.productId)
    .then(function(foundProduct)
    {
        res.json(foundProduct);
    })
    .catch(function(err)
    {
        res.send(err);
    });
};

exports.putProduct = function(req , res)
{
    db.Product.findOneAndUpdate({_id: req.params.productId} , req.body , {new: true})
    .then(function(updatedProduct)
    {
        res.json(updatedProduct);
    })
    .catch(function(err)
    {
        res.send(err);
    });
};

exports.deleteProduct = function(req , res)
{
    db.Product.remove({_id: req.params.productId})
    .then(function()
    {
        res.json({message: "Product deleted."})
    })
    .catch(function(err)
    {
        res.send(err);
    });
};

module.exports = exports;
