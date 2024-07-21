"use strict";
// -----------------------first initialization ------------------
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const findBtn = document.getElementById("find-btn");
const petArr = JSON.parse(getFromStorage("petArr", "[]"));
const tBodyEl = document.getElementById("tbody");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// ------------------------------Render search results --------------------------

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
                      </tr>`;
    tBodyEl.appendChild(row);
  }
}

findBtn.addEventListener("click", function () {
  let filterArr;
  // if (idInput.value !== "") {
  //   const IDfilterArr = petArr.filter((pet) => pet.id === idInput.value);
  //   renderTableData(IDfilterArr);
  // }
  // else if (nameInput.value !== "") {
  //   filterArr = petArr.filter((pet) => pet.name === nameInput.value);
  // } else if (typeInput.value !== "") {
  //   filterArr = petArr.filter((pet) => pet.type === typeInput.value);
  // } else if (breedInput.value !== "") {
  //   filterArr;
  // }
  const filteredPet = petArr.filter(
    (pet) =>
      pet.id === idInput.value &&
      pet.name === nameInput.value &&
      pet.type === typeInput.value &&
      pet.breed === breedInput.value
  );
  renderTableData(filteredPet);
});

// -------------------------------Breed show base on type-----------------

function renderBreed(arr) {
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("option");
    row.innerHTML = `<option>${arr[i].name}</option>`;
    breedInput.appendChild(row);
  }
}

function showBreedOnType() {
  const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
  renderBreed(breedArr);
}
