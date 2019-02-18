function setButtonsUp()
{
    var buttonsEditar = document.querySelectorAll(".button-editar");

    buttonsEditar.forEach(function(buttonEditar)
    {
        buttonEditar.addEventListener("click" , function()
        {
            buttonEditar.style.display = "none";
            buttonEditar.nextElementSibling.style.display = "inline-block";

            buttonEditar.parentNode.querySelectorAll("input").forEach(function(input)
            {
                input.readOnly = false;
            });
        });
    });

    var buttonsSalvar = document.querySelectorAll(".button-salvar");

    buttonsSalvar.forEach(function(buttonSalvar)
    {
        buttonSalvar.addEventListener("click" , function()
        {
            // Update on database

            buttonSalvar.style.display = "none";
            buttonSalvar.previousElementSibling.style.display = "inline-block";

            buttonSalvar.parentNode.querySelectorAll("input").forEach(function(input)
            {
                input.readOnly = true;
            });
        });
    });

    var buttonsRemover = document.querySelectorAll(".button-remover");

    buttonsRemover.forEach(function(buttonRemover)
    {
        buttonRemover.addEventListener("click" , function()
        {
            // Delete from database
        });
    });
}

const buttonNovo = document.querySelector("#button-novo");

buttonNovo.addEventListener("click" , function()
{
    var list = document.querySelector("ol");

    list.innerHTML += "<li><input type = 'text' placeholder = 'Nome'>" +
        "<input type = 'text' placeholder = 'Preço (em R$)'>" +
        "<input type = 'text' placeholder = 'Link ML'>" +
        "<input type = 'text' placeholder = 'Link Imagem'>" +
        "<button class = 'button-editar' style = 'display: none'>Editar</button>" +
        "<button class = 'button-salvar' style = 'display: inline-block'>Salvar</button>" +
        "<button class = 'button-remover'>Remover</button></li>";

    setButtonsUp();
});
