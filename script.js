
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import axios
import axios from 'axios';

//import markdown
import {markdown} from 'markdown';
/*
  Put the JavaScript code you want below.
*/


//fct that imports api content;  used in displayCharPool
let getChar = async () => {
  try {
    let importChar = await axios.get('https://character-database.becode.xyz/characters')
    return importChar.data;
  } catch (error) {
    console.error(error);
  }
}

//fct to display
let displayChar = (index, input) => {
 let dispName = document.getElementsByClassName("displayName")[0];
 dispName.innerText = input.name;
 let dispShortD = document.getElementsByClassName("displayShortD")[0];
 dispShortD.innerText = input.shortDescription;
 let dispLongD =document.getElementsByClassName("displayLongD")[0];
 dispLongD.innerHTML = markdown.toHTML(input.description);
}

//fct to create
let createChar = async () => {
  let newName = document.getElementById("newName").value;
  let newShortD = document.getElementById("newShortD").value;
  let newLongD = document.getElementById("newLongD").value;
  let newImg = document.querySelector(".thumb").src;
  newImg = newImg.substring(newImg.indexOf(",")+1);;
  let newString = {
    name: newName,
    shortDescription: newShortD,
    description: newLongD,
    image: newImg
  };
  console.log(newString);
  try {
     await axios.post('https://character-database.becode.xyz/characters', newString);
     displayCharPool();

  } catch (error) {
    console.error(error);
  }
  // empty inputs for the next addition
  document.getElementById("newName").value = "";
  document.getElementById("newShortD").value = "";
  document.getElementById("newLongD").value = "";
}

// button to call createChar
let btnCreate = document.getElementsByClassName("buttonCreate")[0];
btnCreate.addEventListener('click', () => {createChar()});

//var used to store temp data; used in editCar, editCharYes, deleteChar & deleteCharYes
let toDelete ="";
let toEdit ="";

//fct to store a char.id to edit; used in editCharYes
let editChar = (input) => {
  toEdit = input.id;
  let editName = document.getElementById("editName");
  let editShortD = document.getElementById("editShortD");
  let editLongD = document.getElementById("editLongD");
  // let editImg = document.getElementById("files");
  editName.value = input.name;
  editShortD.value = input.shortDescription;
  editLongD.value = input.description;
  // editImg.src = input.image;
}

//fct to edit
let editCharYes = async () => {
  let idEdit = toEdit;
  let editNameContent = document.getElementById("editName").value;
  let editShortDContent = document.getElementById("editShortD").value;
  let editLongDContent = document.getElementById("editLongD").value;
  let editImg = document.querySelector(".thumb").src;
  editImg = editImg.substring(editImg.indexOf(",")+1);
  let editString = {
    name: editNameContent,
    shortDescription: editShortDContent,
    description: editLongDContent,
    image: editImg
  }

  try {
    await axios.put('https://character-database.becode.xyz/characters/'+idEdit, editString);
    displayCharPool();
  } catch (error) {
    console.error(error);
  }
}

//button to call editCharYes
let btnEdit = document.getElementsByClassName("buttonEdit")[0];
btnEdit.addEventListener('click', () => {editCharYes()});

//fct to store a char.id to delete
let deleteChar = (input) => {
  toDelete = input.id;
}

//fct to delete
let deleteCharYes = async () => {
  let idDelete = toDelete;
  try{
    await axios.delete('https://character-database.becode.xyz/characters/'+idDelete);
     displayCharPool();
  } catch (error){
    console.error(error);
  }

}

//button to call deleteCharYes
let btnDelete = document.getElementsByClassName("buttonDelete")[0];
btnDelete.addEventListener('click', () => {deleteCharYes()});

// fct that creates and appends generic html structure then fills it with api content
let displayCharPool =  async () => {
  let charPool = await getChar();
  let charBox = document.querySelector(".characterBox");
  charBox.innerHTML = "";
  for (let i = 0 ; i < charPool.length ;  i++){
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
    charDelete.addEventListener('click', () => {deleteChar(charPool[i])});
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
    if(charPool[i].image){
      charImgContent.src = "data:image;base64,"+charPool[i].image;
    }
  }
}

let handleFileSelect = (evt) => {
  var files = evt.target.files; // FileList object
  console.log(evt);

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = evt.target.parentElement.parentElement.querySelector('.span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}


document.getElementById('filesCreate').addEventListener('change', handleFileSelect, false);
document.getElementById('filesEdit').addEventListener('change', handleFileSelect, false);

//fct call to fill the page
displayCharPool();

console.log("Hey look in your browser console. It works!");
