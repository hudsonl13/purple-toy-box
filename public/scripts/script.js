const collapsibleMenuButton = document.querySelector("#collapsible-menu-button");
const collapsibleMenu = document.querySelector("#collapsible-menu");

collapsibleMenuButton.addEventListener("click" , function()
{
    collapsibleMenu.classList.toggle("menu-active");
});

const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach(function(filterButton)
{
    filterButton.addEventListener("click" , function()
    {
        filterButton.classList.toggle("filter__button--active");
    });
});

document.addEventListener("DOMContentLoaded" , function(event)
{
    fetch("/api/products")
    .then(function(response)
    {
        return response.json();
    })
    .then(addProducts);
});

function addProducts(products)
{
    Array.from(products).forEach(function(product)
    {
        addProduct(product);
    });
}

function addProduct(product)
{
    var newProduct = `<div class = 'product'>
        <a href = '${product.link}'><div class = 'product-image'><img src = '${product.image}'></div></a>
        <div class = 'product-info'>
            <p>${product.name}</p>
            <p>R$ ${product.price.toFixed(2).replace("." , ",")}</p>
        </div>
    </div>`

    document.querySelector(".products").insertAdjacentHTML("beforeend" , newProduct);
}
