/*
Bonjour Madame, Pour vous simplier la tâche afin que vous puissiez vérifier directement les résultats et tous,
on a fait en sorte que le nombre caché générer par l'ordinateur est afficher dans la console,
donc vous pouvais triché :), et vérifier le fonctionnement de l'algorithme.

Les règles sont présentées dans le menu alerte customisé du menu principal.

Pour deviner un nombre, il faut que vous entrer 4 nombres dans le champ input et 
soit taper sur le bouton valider ou sur Entrer sur le clavier.

On vous souhaite un joyeux noël et bonne année!!
*/

let nbreTab; // Tableau d'entier
let nbEssai = 0; // nombre d'essai effectuer et non pas nombre d'essai restant!!!
let borneMax = 9; //max inclue

function getRandomTabInt(max) {
  var arr = [];
  for (var i = 0, l = 4; i < l; i++) {
    arr.push(Math.round(Math.random() * max))
  }
  return arr.join("");
}
function supHistorique(){
  /*Fonction permettant de retirer tous l'historique d'une partie précendente 
    s'il y'en avait sauf le premier elément qui sert de header*/
  const historique = document.getElementById("historique");
  while (historique.lastChild.id !== 'header') {
    historique.removeChild(historique.lastChild);
  }
}
function transitionPopupAbondon(){
  supHistorique();
  document.getElementById("numGen").innerHTML = `Le nombre caché était: ${nbreTab}`;
  document.getElementById("poPupAbondon").style.display = 'block';
  document.getElementById("upper").style.display = 'none';
  document.getElementById("lower").style.display = 'none';
}
function transitionPopupGagner(){
  supHistorique();
  document.getElementById("stat").innerHTML = `Vous être parvenu à deviner le numéro caché  - ${nbreTab} -
  après ${nbEssai} tentatives, Bravo !`;
  document.getElementById("poPupGagner").style.display = 'block';
  document.getElementById("upper").style.display = 'none';
  document.getElementById("lower").style.display = 'none';
}
function transitionEnJeu(){
  supHistorique();
  document.getElementById("menuContainer").style.display = 'none';
  document.getElementById("poPupAbondon").style.display = 'none';
  document.getElementById("poPupGagner").style.display = 'none';
  document.getElementById("upper").style.display = 'flex';
  document.getElementById("lower").style.display = 'flex';
  debuterPartie();
}
function transitionHorsJeu(){
  document.getElementById("menuContainer").style.display = 'flex';
  document.getElementById("upper").style.display = 'none';
  document.getElementById("lower").style.display = 'none';
  document.getElementById("poPupAbondon").style.display = 'none';
  document.getElementById("poPupGagner").style.display = 'none';
}
function debuterPartie() {
  nbreTab = getRandomTabInt(borneMax);
  nbEssai = 0;
  console.log("Nombre caché: " + nbreTab);
}

function jouer() {
  const bFieldValue = document.getElementById('bField').value;
  if (bFieldValue.length != 4 || /[a-zA-Z?]/.test(bFieldValue)){
    alerteEntré();
  }
  else{
    let resultat = "";
    nbEssai +=1;
    let cb = [0,0]; // index 0 => cows ; index 1 => bulls
    for (let i = 0; i < 4; i++){ //Code Brute : 4 Car on estime que ça sera toujours la difficulté facile : 4 nombres :)
      if (bFieldValue[i] === nbreTab[i]){
        cb[1] +=1;
      } else if (nbreTab.includes(bFieldValue[i])){
        cb[0] +=1;
      }
    }
    if (cb[1] == 4){
      transitionPopupGagner();
    }
    else{
      afficherResultat(bFieldValue,nbEssai,cb[0],cb[1]);
    }
  }
}

function afficherResultat(bFieldValue, nbEssai, cb0, cb1) {
  const historique = document.getElementById("historique");
  
  const listTemp = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const span4 = document.createElement("span");

  const span1Value = document.createTextNode(bFieldValue);
  const span2Value = document.createTextNode(nbEssai);
  const span3Value = document.createTextNode(cb0);
  const span4Value = document.createTextNode(cb1);
  span1.appendChild(span1Value);
  span2.appendChild(span2Value);
  span3.appendChild(span3Value);
  span4.appendChild(span4Value);

  listTemp.appendChild(span1);
  listTemp.appendChild(span2);
  listTemp.appendChild(span3);
  listTemp.appendChild(span4);
  historique.appendChild(listTemp);
}
function fermerRegle(){
  document.getElementById('dialogbox').style.display = "none";
  document.getElementById('dialogoverlay').style.display = "none";
}

function regleAlerte(titre){
  //Body personalisé de l'alerte ajouté en plus du body existant
  document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="etendDuMillieu"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
  //Référence des eléments créer
  let dialogoverlay = document.getElementById('dialogoverlay');
  let dialogbox = document.getElementById('dialogbox');
  let winH = window.innerHeight;
  dialogoverlay.style.height = winH+"px";

  dialogbox.style.top = "100px";

  dialogoverlay.style.display = "block";
  dialogbox.style.display = "block";

  document.getElementById('dialogboxhead').style.display = 'block';

  document.getElementById('dialogboxhead').innerHTML = titre;
  document.getElementById('dialogboxbody').innerHTML = `
    Bulls and Cows est un jeu à 2 joueurs. Un joueur pense à un nombre, tandis que l'autre joueur essaie de le deviner. Dans ce cas, votre adversaire est l'ordinateur.<br><br>
    Le nombre à deviner doit être un nombre à 4 chiffres, n'utilisant que des chiffres de 1 à 9. Dans ce variant, toutes les combinaisons sont possibles, par exemple. 1234, 0123, 9877, 9876.<br><br>
    Pour chaque supposition que le joueur fait, il obtient 2 valeurs - le nombre de taureaux (Bulls) et le nombre de vaches (Cows).<br><br>
    Un taureau signifie que le nombre deviner et le nombre cible sont égaux et dans la bonne position.<br><br>
    Une vache signifie que la supposition et la cible ont 1 chiffre en commun, mais pas dans la bonne position.<br><br>
    Exemple, soit un nombre de 1234. Deviner 4321 donnera 0 taureaux et 4 vaches. 3241 donnera 1 taureau et 3 vaches. 4 taureaux signifient que vous avez gagné la partie !`;
  //Implementer un bouton de fermeture de l'alerte en ajoutant une fonction dédier
  document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="fermerRegle()">OK</button>';
}
var bField = document.getElementById("bField");
bField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        jouer();
    }
});
function alerteEntré(){
  alert(`2 règles primordiales doivent être respectées:\n
    - 4 nombres sont nécessaires pour procédé;
    - Les lettres ne sont pas acceptées.`)
}