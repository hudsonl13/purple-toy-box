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
