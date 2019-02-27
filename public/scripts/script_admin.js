document.addEventListener("DOMContentLoaded" , function(event)
{
    fetch("/api/products")
    .then(function(response)
    {
        return response.json();
    })
    .then(addProducts);
});

function handleEditar()
{
    this.style.display = "none";
    this.nextElementSibling.style.display = "inline";

    this.parentNode.querySelectorAll("input").forEach(function(input)
    {
        input.readOnly = false;
    });
}

function handleSalvar()
{
    upsertProduct(this.parentNode);

    this.style.display = "none";
    this.previousElementSibling.style.display = "inline";

    this.parentNode.querySelectorAll("input").forEach(function(input)
    {
        input.readOnly = true;
    });
}

function handleRemover()
{
    removeProduct(this.parentNode);
}

function setButtonsUp()
{
    var buttonsEditar = document.querySelectorAll(".button-editar");

    buttonsEditar.forEach(function(buttonEditar)
    {
        buttonEditar.removeEventListener("click" , handleEditar);
        buttonEditar.addEventListener("click" , handleEditar);
    });

    var buttonsSalvar = document.querySelectorAll(".button-salvar");

    buttonsSalvar.forEach(function(buttonSalvar)
    {
        buttonSalvar.removeEventListener("click" , handleSalvar);
        buttonSalvar.addEventListener("click" ,handleSalvar);
    });

    var buttonsRemover = document.querySelectorAll(".button-remover");

    buttonsRemover.forEach(function(buttonRemover)
    {
        buttonRemover.addEventListener("click" , function()
        {
            buttonRemover.removeEventListener("click" , handleRemover);
            buttonRemover.addEventListener("click" ,handleRemover);
        });
    });
}

function addProducts(products)
{
    Array.from(products).forEach(function(product)
    {
        addProduct(product);
    });
}

function addProduct(product)
{
    var newProduct = `<li data-id = '${product._id}'><input class = 'name' type = 'text' placeholder = 'Nome' value = '${product.name}' readonly><input class = 'price' type = 'number' step = '.01' placeholder = 'Preço (em R$)' value = '${product.price.toFixed(2)}' readonly><input class = 'link' type = 'text' placeholder = 'Link ML' value = '${product.link}' readonly><input class = 'image' type = 'text' placeholder = 'Link Imagem' value = '${product.image}' readonly><button class = 'button-editar' style = 'display: inline'>Editar</button><button class = 'button-salvar' style = 'display: none'>Salvar</button><button class = 'button-remover'>Remover</button></li>`;

    document.querySelector("ol").insertAdjacentHTML("beforeend" , newProduct);

    setButtonsUp();
}

function upsertProduct(product)
{
    var clickedProductId = product.dataset.id;
    var productName = product.querySelector(".name").value;
    var productPrice = product.querySelector(".price").value;
    var productLink = product.querySelector(".link").value;
    var productImage = product.querySelector(".image").value;

    var data = {name: productName , price: productPrice , link: productLink , image: productImage};

    if (! clickedProductId)
    {
        fetch("/api/products" , {method: "post" , headers: {"Content-type": "application/json"} , body: JSON.stringify(data)})
        .then(function(newProduct)
        {
            return newProduct.json();
        })
        .then(function(newProduct)
        {
            product.dataset.id = newProduct._id;
        });
    }
    else
    {
        fetch("/api/products/" + clickedProductId , {method: "put" , headers: {"Content-type": "application/json"} , body: JSON.stringify(data)})
        .then(function(newProduct)
        {
            return newProduct.json();
        });
    }
}

function removeProduct(product)
{
    var clickedProductId = product.dataset.id;

    fetch("/api/products/" + clickedProductId , {method: "delete"})
    .then(function()
    {
        product.remove();
    });
}

const buttonNovo = document.querySelector("#button-novo");

buttonNovo.addEventListener("click" , function()
{
    var list = document.querySelector("ol");

    var product = "<li><input class = 'name' type = 'text' placeholder = 'Nome'>" +
        "<input class = 'price' type = 'number' step = '.01' placeholder = 'Preço (em R$)'>" +
        "<input class = 'link' type = 'text' placeholder = 'Link ML'>" +
        "<input class = 'image' type = 'text' placeholder = 'Link Imagem'>" +
        "<button class = 'button-editar' style = 'display: none'>Editar</button>" +
        "<button class = 'button-salvar' style = 'display: inline'>Salvar</button>" +
        "<button class = 'button-remover'>Remover</button></li>";

    list.insertAdjacentHTML("beforeend" , product);

    setButtonsUp();
});
