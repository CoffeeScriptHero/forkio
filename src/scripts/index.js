const btnMenu = document.getElementById("uppermenu__burger");
const navMenu = document.getElementById("navmenu");

let btnClass = btnMenu.className;

btnMenu.addEventListener("click", () => {
   if (btnMenu.className === "uppermenu__burger") {
    btnMenu.className = "uppermenu__burger--active";
    navMenu.style.display = "block";
   } else {
    btnMenu.className = "uppermenu__burger";
    navMenu.style.display = "none";
   }
});