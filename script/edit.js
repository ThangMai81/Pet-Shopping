"use strict";
// ----------------------first initialize ---------------------
const tBodyEl = document.getElementById("tbody");
const formContainerEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// ----------------------render table data---------------------
let petArr = JSON.parse(getFromStorage("petArr", "[]"));
function renderEditData(petArr) {
  // function for add checkbox circle (x or circle)
  // const checkedSymbol = (checkedObject, addObject) => {
  //   if (checkedObject == true) {
  //     addObject += `<td><i class="bi bi-check-circle-fill"></i></td>`;
  //   } else {
  //     addObject += `<td><i class="bi bi-x-circle-fill"></i></td>`;
  //   }
  // };

  tBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
                      <th scope="row">${petArr[i].id}</th>
                      <td>${petArr[i].name}</td>
                      <td>${petArr[i].age}</td>
                      <td>${petArr[i].type}</td>
                      <td>${petArr[i].weight} kg</td>
                      <td>${petArr[i].length} cm</td>
                      <td>${petArr[i].breed}</td>
                      <td>
                        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
                      </td>
                      
                    `;
    if (petArr[i].vaccinated == true) {
      row.innerHTML += `<td><i class="bi bi-check-circle-fill"></i></td>`;
    } else {
      row.innerHTML += `<td><i class="bi bi-x-circle-fill"></i></td>`;
    }
    if (petArr[i].dewormed == true) {
      row.innerHTML += `<td><i class="bi bi-check-circle-fill"></i></td>`;
    } else {
      row.innerHTML += `<td><i class="bi bi-x-circle-fill"></i></td>`;
    }
    if (petArr[i].sterilized == true) {
      row.innerHTML += `<td><i class="bi bi-check-circle-fill"></i></td>`;
    } else {
      row.innerHTML += `<td><i class="bi bi-x-circle-fill"></i></td>`;
    }
    // checkedSymbol(petArr[i].vaccinated, row.innerHTML);
    // checkedSymbol(petArr[i].dewormed, row.innerHTML);
    // checkedSymbol(petArr[i].sterilized, row.innerHTML);
    row.innerHTML += `<td>01/03/2022</td>
                      <td><button type="button" class="btn btn-warning" onclick = "editPet(${
                        // document.getElementById("tbody").querySelectorAll("th")[
                        //   i
                        // ]
                        i
                      })">Edit</button>
                      </td>
                      </tr>`;
    tBodyEl.appendChild(row);
  }
}
renderEditData(petArr);
// ------------------------handling edit pet button-----------------------

function setPlaceholder(numOfIndex) {
  idInput.value = petArr[numOfIndex].id;
  nameInput.value = petArr[numOfIndex].name;
  ageInput.value = petArr[numOfIndex].age;
  typeInput.value = petArr[numOfIndex].type;
  weightInput.value = petArr[numOfIndex].weight;
  lengthInput.value = petArr[numOfIndex].length;
  colorInput.value = petArr[numOfIndex].color;
  breedInput.value = String(petArr[numOfIndex].breed);
  vaccinatedInput.checked = petArr[numOfIndex].vaccinated;
  dewormedInput.checked = petArr[numOfIndex].dewormed;
  sterilizedInput.checked = petArr[numOfIndex].sterilized;
}

function editPet(numOfIndex) {
  petArr = JSON.parse(getFromStorage("petArr", "[]"));
  formContainerEl.classList.remove("hide");
  setPlaceholder(numOfIndex);
  showBreedOnType();
}

function clearInput() {
  idInput.value = "";
  typeInput.value = "Select Type";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// +++ functions for editting info +++

function editInfo(index) {
  petArr[index].type = typeInput.value;
  petArr[index].name = nameInput.value;
  petArr[index].age = ageInput.value;
  petArr[index].weight = weightInput.value;
  petArr[index].length = lengthInput.value;
  petArr[index].breed = breedInput.value;
  petArr[index].color = colorInput.value;
  petArr[index].vaccinated = vaccinatedInput.checked;
  petArr[index].dewormed = dewormedInput.checked;
  petArr[index].sterilized = sterilizedInput.checked;
  petArr[index].date = new Date();
}

submitBtn.addEventListener("click", function () {
  // +++create object to get value from input form

  let validate = true;

  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  if (typeof parseInt(data.age) !== "number") {
    alert("Age is not a number, please type again!");
    validate = false;
    return;
  }
  if (typeof parseInt(data.weight) !== "number") {
    alert("Weight is not a number, please type again!");
    validate = false;
    return;
  }
  if (typeof parseInt(data.length) !== "number") {
    alert("Length is not a number, please type again!");
    validate = false;
    return;
  }
  // Check if empty
  const emptyCheck =
    Boolean(data.id) &&
    Boolean(data.name) &&
    Boolean(data.age) &&
    Boolean(data.type) &&
    Boolean(data.weight) &&
    Boolean(data.length) &&
    Boolean(data.breed);
  if (emptyCheck == false) {
    alert("Please enter full information!");
    validate = false;
    return;
  } else {
    if (data.age > 15 || data.age < 1) {
      alert(`Age must be between 1 and 15!`);
      validate = false;
      return;
    }
    if (data.weight > 15 || data.weight < 1) {
      alert(`Weight must be between 1 and 15!`);
      validate = false;
      return;
    }
    if (data.length > 100 || data.length < 1) {
      alert(`Length must be between 1 and 100!`);
      validate = false;
      return;
    }
    if (data.breed == "Select Breed" && data.type == "Select Type") {
      alert(`Please select type!`);
      alert(`Please select breed!`);
      validate = false;
      return;
    }
    if (data.type == "Select Type") {
      alert(`Please select type!`);
      validate = false;
      return;
    }
    if (data.breed == "Select Breed") {
      alert(`Please select breed!`);
      validate = false;
      return;
    }
  }
  // Add value into the list

  if (validate === true) {
    petArr = JSON.parse(getFromStorage("petArr", "[]"));
    const index = petArr.findIndex((pet) => pet.id === data.id);
    editInfo(index);
    // +++ Save to local storage
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    formContainerEl.classList.add("hide");
    renderEditData(petArr);
  }
});

// ------------------------Adding breed options in main page------------

function renderBreed(arr) {
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("option");
    row.innerHTML = `<option>${arr[i].name}</option>`;
    breedInput.appendChild(row);
  }
}

function showBreedOnType() {
  const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
  if (typeInput.value === "Dog") {
    breedInput.innerHTML = "<option>Select Breed</option>";
    const dogBreedArr = breedArr.filter((breed) => breed.type === "Dog");
    renderBreed(dogBreedArr);
  } else {
    breedInput.innerHTML = "<option>Select Breed</option>";
    const catBreedArr = breedArr.filter((breed) => breed.type === "Cat");
    renderBreed(catBreedArr);
  }
}

breedInput.addEventListener("click", function (e) {
  if (typeInput.value === "Select Type") {
    alert("Please select type before select breed!");
    return;
  }
});
