"use strict";

// -----------------first initialize----------------
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
// +++variable for ID validation
const tBodyEl = document.getElementById("tbody");
const THFieldValues = tBodyEl.getElementsByTagName("th");
const allTRFieldValues = tBodyEl.getElementsByTagName("tr");
// +++variable for delete button
const deleteBtnEl = document.querySelectorAll(".btn-danger");
// +++ variable for list of pets
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
// +++ variable for list healthy pet
const healthyBtnEl = document.getElementById("healthy-btn");
let healthyCheck = true;
let healthyPetArr = [];
// -------------------handling submit button-----------------------
// +++ Handling coincidence typing

// ------------------Render the table data (when add new object to the list)-------------------

function renderTableData(petArr) {
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
                      <td><button type="button" class="btn btn-danger" onclick = "deletePet(${
                        // document.getElementById("tbody").querySelectorAll("th")[
                        //   i
                        // ]
                        i
                      })">Delete</button>
                      </td>
                      </tr>`;
    tBodyEl.appendChild(row);
  }
}

renderTableData(petArr);

// --------------------Clear all input after submit-----------------------

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

// ----------------------Handling event when click submit button----------------------

submitBtn.addEventListener("click", function (e) {
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
    for (let i = 0; i < THFieldValues.length; i++) {
      if (THFieldValues[i].textContent == data.id) {
        alert(`ID must be unique!`);
        validate = false;
        return;
      }
    }
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
    petArr.push(data);
    // +++ Save to local storage
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});

// --------------------------Delete 1 pet--------------------

// for (let i = 0; i < deleteBtnEl.length; i++) {
//   deleteBtnEl[i].addEventListener("click", function (e) {
//     if (confirm("Are you sure you want to delete ?")) {
//       petArr.splice(i, 1);
//       renderTableData(petArr);
//     }
//   });
// }

// const deletePet = (petID) => {
//   let isEqualID;
//   for (let i = 0; i < petArr.length; i++) {
//     isEqualID = () => {
//       petID === petArr[i].id;
//     };
//   }
//   if (confirm("Are you sure you want to delete ? ")) {
//     petArr.splice(petArr.findIndex(isEqualID) - 1, 1);
//     console.log("After delete:", petArr);
//     renderTableData(petArr);
//   }
// };
const deletePet = (numOfIndex) => {
  // let deletedID = document.getElementById("tbody").querySelectorAll("th")[
  //   numOfIndex
  // ];
  // let isEqualID;
  // for (let i = 0; i < petArr.length; i++) {
  //   isEqualID = (deletedID) => {
  //     deletedID === i;
  //   };
  // }
  if (confirm("Are you sure you want to delete ? ")) {
    // petArr.splice(petArr.findIndex(isEqualID), 1);
    petArr.splice(numOfIndex, 1);
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
  }
};
// first initialize when first access the page because the html text will automatically
// add more space character for good-looking code, we need the textContent without those spaces
healthyBtnEl.textContent = "Show Healthy Pets";

healthyBtnEl.addEventListener("click", () => {
  if (healthyBtnEl.textContent === "Show Healthy Pets") {
    healthyCheck = true;
  } else {
    healthyCheck = false;
  }
  if (healthyCheck === true) {
    healthyPetArr = [];
    healthyBtnEl.textContent = "Show All Pets";
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
  } else {
    healthyBtnEl.textContent = "Show Healthy Pets";
    renderTableData(petArr);
  }
});

// *-----------------------Assignment 02 ---------------------*
// ------------------------first initialization---------------
// +++ variable for sidebar nav tag
const sidebarEl = document.querySelector("#sidebar");
// +++ Sidebar click handling
sidebarEl.addEventListener("click", function (e) {
  sidebarEl.classList.toggle("active");
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

breedInput.addEventListener("click", function () {
  if (typeInput.value === "Select Type") {
    alert("Please select type before select breed!");
    return;
  }
});
