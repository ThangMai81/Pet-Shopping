"use strict";
// -----------------first initialize for DOM--------------
const nBreedInput = document.getElementById("input-breed");
const nTypeInput = document.getElementById("input-type");
const nSubmitBtn = document.getElementById("submit-btn");
// +++ variables for list of breeds
const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));
// +++ variables for adding new breed to table
const ntBodyEl = document.getElementById("tbody");
console.log(ntBodyEl);
function clearBreedInput() {
  nBreedInput.value = "";
  nTypeInput.value = "Select Type";
}

function renderBreedTable(breedArr) {
  console.log(ntBodyEl);
  ntBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    breedArr[i].serial = i + 1;
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
                      <th scope="row">${breedArr[i].serial}</th>
                      <td>${breedArr[i].name}</td>
                      <td>${breedArr[i].type}</td>
                    `;
    row.innerHTML += `<td>01/03/2022</td>
                      <td><button type="button" class="btn btn-danger" onclick = "deleteBreed(${i})">Delete</button>
                      </td>
                      </tr>`;
    ntBodyEl.appendChild(row);
  }
}
// -----------------Handling submit button --------------------------------
nSubmitBtn.addEventListener("click", function () {
  // +++ initialize data object for each breed
  let validate = true;
  const data = {
    serial: 0,
    name: nBreedInput.value,
    type: nTypeInput.value,
  };
  // +++ check data validity +++
  if (data.name === "" && data.type === "Select Type") {
    alert(`Please type the name of breed!`);
    alert(`Please select type!`);
    validate = false;
    return;
  }
  if (data.name === "") {
    alert(`Please type the name of breed!`);
    validate = false;
    return;
  }
  if (data.type === "Select Type") {
    alert(`Please select type!`);
    validate = false;
    return;
  }
  // +++ if valid
  if (validate === true) {
    breedArr.push(data);
    // +++ Save to local storage
    saveToStorage("breedArr", JSON.stringify(breedArr));
    clearBreedInput();
    renderBreedTable(breedArr);
  }
});

const deleteBreed = (numOfIndex) => {
  // let deletedID = document.getElementById("tbody").querySelectorAll("th")[
  //   numOfIndex
  // ];
  // let isEqualID;
  // for (let i = 0; i < breedArr.length; i++) {
  //   isEqualID = (numOfIndex) => {
  //     numOfIndex === i;
  //   };
  // }
  if (confirm("Are you sure you want to delete ? ")) {
    breedArr.splice(numOfIndex, 1);
    console.log("After delete:", breedArr);
    renderBreedTable(breedArr);
  }
};
