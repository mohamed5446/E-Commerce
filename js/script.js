const categories = ["mens-shirts", "mens-shoes", "mens-watches", "womens-dresses", "womens-shoes", "womens-bags", "womens-jewellery"];

for (let i = 0; i < categories.length; i++) {
  const element = categories[i];
  let products = new XMLHttpRequest();
  products.open("GET", `https://dummyjson.com/products/category/${element}`);
  products.send();
  products.onreadystatechange = function () {
    if (products.readyState == 4 && products.status == 200) {
      let res = JSON.parse(products.responseText);
      let arr = res.products;
      for (let i = 0; i < arr.length; i++) {
        draw(arr[i]);
      }
    }
  };
}

function draw(data) {
  let container = document.getElementById("products-container");
  let product = document.createElement("div");
  product.classList.add("product");

  product.innerHTML = `
    <div class="card">
                    <div class="heart">
                      <i  class="heart-icon fa-regular fa-heart"></i>
                    </div>
                    <img src="${data.thumbnail}" alt="" />
                    <button class="add-to-cart">Quick Add</button>
                  </div>
                  <div class="content">
                    <div class="left">
                      <h2  onclick="viewDetails(${data.id})">${data.title}</h2>
                      <h4>${data.category}</h4>
                      <h3>$${data.price}</h3>
                    </div>
                    <div class="right">
                      <i class="fa-regular fa-star"></i>
                      <span>${data.rating}</span>
                    </div>
                  </div>`;

  let heart = product.querySelector(".heart-icon");
  heart.addEventListener("click", function () {
    if (this.classList.contains("fa-regular")) {
      this.classList.remove("fa-regular");
      this.classList.add("fa-solid");
      this.style.color = "#2bee79";
    } else {
      this.classList.remove("fa-solid");
      this.classList.add("fa-regular");
    }
  });
  container.appendChild(product);
  let addBtn = product.querySelector(".add-to-cart");
  addBtn.onclick = function () {
    addToCart(addBtn, data);
  };
}

function viewDetails(id) {
  localStorage.setItem("go-to-prod", JSON.stringify(id));
  window.location.href = "product.html";
}

var cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(btn, product) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      alert("Already in cart!");
      return;
    }
  }
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  UpdatenumberofItemsSpan();
  alert(product.title + " added to cart!");
}

const container = document.getElementById("products-container");
function getCategories() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://dummyjson.com/products/categories`);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      for (let i = 0; i < res.length; i++) {
        drawCategory(res[i]);
      }
    }
  };
}

function drawCategory(category) {
  const categoryContainer = document.querySelector(".category-list");

  let cat = document.createElement("label");
  cat.classList.add("custom-checkbox");

  cat.innerHTML = `
    <input type="checkbox" value="${category.slug}" onclick="filter()" />
    ${category.name}
  `;

  categoryContainer.appendChild(cat);
}

getCategories();
function filter() {
  container.innerHTML = "";
  let allCheckboxes = document.querySelectorAll(".category-list input[type='checkbox']");
  let is = false;
  for (let i = 0; i < allCheckboxes.length; i++) {
    if (allCheckboxes[i].checked == true) {
      fetchProductsByCategory(allCheckboxes[i].value);
      is = true;
    }
  }
}

function fetchProductsByCategory(cat) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://dummyjson.com/products/category/${cat}`);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let res = JSON.parse(xhr.responseText);
      let productsArray = res.products;

      for (let i = 0; i < productsArray.length; i++) {
        draw(productsArray[i]);
      }
    }
  };
}
function UpdatenumberofItemsSpan() {
  let numberOfItemsSpan = document.querySelector("nav .cart-icon a span");
  numberOfItemsSpan.textContent = cart.length;
}
UpdatenumberofItemsSpan();

function search() {
  container.innerHTML = "";
  var text = document.getElementById("s").value;
  var request = new XMLHttpRequest();
  request.open("GET", "https://dummyjson.com/products/search?q=" + text);
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(request.responseText);
      var ar = response.products;
      for (let j = 0; j < ar.length; j++) {
        draw(ar[j]);
      }
    }
  };
}
const searchInput = document.getElementById("s");
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search();
  }
});
