let h_titre = document.getElementById("heading");
let h_super_image = document.getElementById("mask");

h_titre.addEventListener("mouseenter", (event) => {
  h_super_image.classList.toggle("show");
  /*h_super_image.style.display = "block"; */ 
}, false);
h_titre.addEventListener("mouseout", (event) => {
  h_super_image.classList.remove("show");
  /*h_super_image.style.display = "block"; */
}, false);