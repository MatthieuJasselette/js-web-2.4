
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
let displayChar = (index, input) => {
  console.log(input.id);
 let dispName = document.getElementsByClassName("displayName")[0];
 dispName.innerText = input.name;
 let dispShortD = document.getElementsByClassName("displayShortD")[0];
 dispShortD.innerText = input.shortDescription;
 let dispLongD =document.getElementsByClassName("displayLongD")[0];
 dispLongD.innerText = input.description; //change mkDwn to HTML
}

//fct to create
let createChar = async () => {
  let newName = document.getElementById("newName").value;
  let newShortD = document.getElementById("newShortD").value;
  let newLongD = document.getElementById("newLongD").value;
  let newString = {
    name: newName,
    shortDescription: newShortD,
    description: newLongD
  };
  try {
     await axios.post('https://character-database.becode.xyz/characters', newString);
     displayCharPool();

  } catch (error) {
    console.error(error);
  }
}

// button to call createChar
let btnCreate = document.getElementsByClassName("buttonCreate")[0];
btnCreate.addEventListener('click', () => {createChar()});

//fct to edit
// let editChar = async (index, input) => {
//
// }

//fct to select an entry
let bullet ="bulletControl";
console.log(bullet);

let loadBullet = (input) => {
  bullet = input.id;
  console.log("bulletControl: "+bullet);
}

//fct to delete
let deleteChar = async () => {
  let idDelete = bullet;
  console.log("deleteControl: "+idDelete);
  try{
    await axios.delete('https://character-database.becode.xyz/characters/'+idDelete);
     displayCharPool();
  } catch (error){
    console.error(error);
  }

}

//button to call deleteChar
let btnDelete = document.getElementsByClassName("buttonDelete")[0];
btnDelete.addEventListener('click', () => {deleteChar()});

// fct that creates and appends generic html structure then fills it with api content
let displayCharPool =  async () => {
  let charPool = await getChar();
  console.log(charPool); //control
  let charBox = document.querySelector(".characterBox");
  charBox.innerHTML = "";
  for (let i = 0 ; i < 20 ;  i++){
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
    charName.addEventListener('click', () => {displayChar(i, charPool[i])});
    charName.setAttribute("data-toggle", "modal");
    charName.setAttribute("data-target", "#displayModal");

    let charDescr = document.createElement("p");
    charDescr.setAttribute("class", "characterDescription");

    let charImg = document.createElement("div");
    charImg.setAttribute("class", "characterImg");

    let charImgContent = document.createElement("img");
    charImgContent.setAttribute("class", "characterImgContent");

    let charFooter =  document.createElement("div");
    charFooter.setAttribute("class", "characterFooter");

    let charEdit = document.createElement("button");
    charEdit.setAttribute("type", "button");
    charEdit.setAttribute("class", "btn btn-primary");
    charEdit.setAttribute("data-toggle", "modal");
    charEdit.setAttribute("data-target", "#editionModal")
    charEdit.addEventListener('click', () => {editChar(charPool[i])});
    charEdit.innerText = "Edit Content";

    let charDelete = document.createElement("button");
    charDelete.setAttribute("type", "button");
    charDelete.setAttribute("class", "btn btn-primary");
    charDelete.setAttribute("data-toggle", "modal");
    charDelete.setAttribute("data-target", "#deleteModal")
    charDelete.addEventListener('click', () => {loadBullet(charPool[i])});
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
