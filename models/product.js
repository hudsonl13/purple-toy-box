var mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
{
    ordinal:
    {
        type: Number ,
        required: true
    } ,
    
    name:
    {
        type: String ,
        required: true
    } ,

    price:
    {
        type: Number ,
        required: true
    } ,

    image:
    {
        type: String ,
        required: true
    } ,

    link:
    {
        type: String ,
        required: true
    }
});

var Product = mongoose.model("Product" , productSchema);

module.exports = Product;
