
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import axios
import axios from 'axios';
/*
  Put the JavaScript code you want below.
*/

//fct that imports api content;  used in displayCharPool
let getChar = async () => {
  try {
    let importChar = await axios.get('https://character-database.becode.xyz/characters')
    console.log("control getChar"); //control
    return importChar.data;
  } catch (error) {
    console.error(error);
  }
}

//fct to display
let displayChar = () => {
 let dispName = document.getElementsByClassName("displayName")[0];
 dispName.innerText = document.getElementsByClassName("characterName")[i].innerText; // input
 let dispShortD = document.getElementsByClassName("characterDescription[i]")
}

//fct to edit
// let editChar = async () => {
//
// }

//fct to delete
// let deleteChar = async () => {
//
// }

// fct that creates and appends generic html structure then fills it with api content
let displayCharPool =  async () => {
  let charPool = await getChar();
  console.log(charPool); //control
  let charBox = document.querySelector(".characterBox");
  for (let i = 0 ; i < 6 ;  i++){
    console.log("loop control");
    //create content structure
    let charItem = document.createElement("div");
    charItem.setAttribute("class", "characterItem");
    let charBody = document.createElement("div");
    charBody.setAttribute("class", "characterBody");
    let charInfo = document.createElement("div");
    charInfo.setAttribute("class", "characterInfo");
    let charName = document.createElement("h5");
    charName.setAttribute("class", "characterName");
    charName.addEventListener('click', () => {displayChar(i)});
    charName.setAttribute("data-toggle", "modal");
    charName.setAttribute("data-target", "#displayModal");
    let charDescr = document.createElement("p");
    charDescr.setAttribute("class", "characterDescription");
    let charImg = document.createElement("div");
    charImg.setAttribute("class", "characterImg")
    let charImgContent = document.createElement("img")
    charImgContent.setAttribute("class", "characterImgContent")
    let charFooter =  document.createElement("div");
    charFooter.setAttribute("class", "characterFooter")
    let charEdit = document.createElement("button");
    charEdit.setAttribute("type", "button");
    charEdit.setAttribute("class", "btn btn-primary");
    charEdit.setAttribute("data-toggle", "modal");
    charEdit.setAttribute("data-target", "#editionModal")
    charEdit.addEventListener('click', () => {editChar(i)});
    charEdit.innerText = "Edit Content";
    let charDelete = document.createElement("button");
    charDelete.setAttribute("type", "button");
    charDelete.setAttribute("class", "btn btn-primary");
    charDelete.setAttribute("data-toggle", "modal");
    charDelete.setAttribute("data-target", "#deleteModal")
    charDelete.addEventListener('click', () => {deleteChar(i)});
    charDelete.innerText = "Delete Content";
    //append content structure
    charBox.appendChild(charItem);
    charItem.appendChild(charBody);
    charItem.appendChild(charFooter);
    charBody.appendChild(charInfo);
    charBody.appendChild(charImg);
    charInfo.appendChild(charName);
    charInfo.appendChild(charDescr);
    charImg.appendChild(charImgContent);
    charFooter.appendChild(charEdit);
    charFooter.appendChild(charDelete);
    // fill Content
    charName.innerText = charPool[i].name;
    charDescr.innerText = charPool[i].shortDescription;
    charImgContent.src = "#";
  }
}

//fct call to fill the page
displayCharPool();

console.log("Hey look in your browser console. It works!");
