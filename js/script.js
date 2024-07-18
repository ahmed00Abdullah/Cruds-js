let mode = "create";
let tmb;

// ---------------------------- get Total ---------------------------

var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var submet = document.getElementById("submet");

let finalTotal;
function totalPrice() {
  if (price.value !== "") {
    finalTotal = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = finalTotal;
    total.style.background = " rgb(0, 110, 255)";
  } else {
    total.innerHTML = "";
    total.style.background = "rgba(160, 2, 2, 0.49)";
  }
}

// ----------------------------------- create product -------------------------------

var title = document.getElementById("title");
var category = document.getElementById("category");

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

function createPro() {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count <= 100 &&
    newPro.count > 0
  ) {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmb] = newPro;
      submet.innerHTML = "Create";
      count.style.display = "block";
    }
    console.log(newPro.count);
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  readData();

  console.log(dataPro);
}

// --------------------------------------- clear data --------------------------------------------------------

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.background = "rgba(160, 2, 2, 0.49)";
}

// -------------------------------------- read data ---------------------------------------------------------

var tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
function readData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
                </tr>
        
        `;
  }
  tbody.innerHTML = table;
  if (dataPro.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
}
readData();

// ------------------------------------- delete product ------------------------------------------------

function deletePro(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  readData();
}

// ------------------------------------- delete all product ------------------------------------------------
function deleteAllPro() {
  localStorage.clear();
  dataPro.splice(0);
  readData();
}

// -------------------------------------- update data ---------------------------------------------------------

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = "none";
  totalPrice();
  category.value = dataPro[i].category;

  mode = "update";

  submet.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });

  tmb = i;
}

// -------------------------------------- SearchMode data ---------------------------------------------------------
let searchMode = "title";
let search = document.getElementById("search");

function getSearchMode(id) {
  search.focus();

  if (id == "search-title") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }

  search.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  if (searchMode === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
                </tr>
        
        `;
      } else {
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deletePro(${i})" id="delete">Delete</button></td>
                </tr>
        
        `;
      } else {
      }
    }
  }
  tbody.innerHTML = table;
}

// //////////////////////////////////// btn-angles scroll ///////////////////////////////////////////
let btnScroll = document.getElementById("btn-angles");
window.onscroll = function () {
  if (scrollY >= 100) {
    btnScroll.style.display = "block";
  } else {
    btnScroll.style.display = "none";
  }
};
btnScroll.onclick = function () {
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
