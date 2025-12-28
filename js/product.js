let acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

let id = JSON.parse(localStorage.getItem("go-to-prod"));
getProductDetails(id);

function getProductDetails(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://dummyjson.com/products/${id}`);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let productData = JSON.parse(xhr.responseText);
      displayProduct(productData);
    }
  };
}
function displayProduct(prod) {
  let container = document.querySelector(".main-sec");

  let productSection = document.createElement("section");
  productSection.classList.add("product");
  productSection.innerHTML = `
    <div class="left">
    ${
      prod.images.length < 4
        ? `
    <img src="${prod.thumbnail}" alt="" />
    <img src="${prod.thumbnail}" alt="" />
    <img src="${prod.thumbnail}" alt="" />
    <img src="${prod.thumbnail}" alt="" />
    <div class="img-wrapper">
    <img src="${prod.thumbnail}" alt="" />
    </div>
  `
        : `
    <img src="${prod.images[0]}" alt="" />
    <img src="${prod.images[1]}" alt="" />
    <img src="${prod.images[2]}" alt="" />
    <img src="${prod.images[3]}" alt="" />
    <img src="${prod.images[0]}" alt="" />
    
  `
    }
  </div>
  <div class="right">
    <div class="first">
      <button>New Arrival</button>
      <div class="stars">
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="reviews">(124 Reviews)</div>
    </div>
    <h2>${prod.title}</h2>
    <h3>$${prod.price}</h3>
    <div class="line"></div>
    <div class="color">
      <span>color:</span> <span>faded blue</span>
      <div class="circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    <div class="size">
      <div class="first">
        <span>Size</span>
        <a href="#">Size Guide</a>
      </div>
      <div class="sizes">
        <button>XS</button>
        <button>s</button>
        <button>M</button>
        <button>L</button>
        <button>XL</button>
      </div>
      <div class="actions">
        <button class="add-to-cart">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
        <button>
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="details">
        <button class="accordion">Description</button>
        <div class="panel">
          <p>
           ${prod.description}
          </p>
          <ul>
            <li>100% Cotton Denim</li>
            <li>100% Cotton Denim</li>
            <li>100% Cotton Denim</li>
          </ul>
        </div>

        <button class="accordion">Shipping & Returns</button>
        <div class="panel">
          <p>Free standard shipping on orders over $150. Returns accepted within 30 days of purchase. Items must be unworn and tags attached.</p>
        </div>

        <button class="accordion">Reviews</button>
        <div class="panel">
          <div class="card">
            <div class="img"></div>
            <div class="right">
              <div class="name">
                <h3>Alex M.</h3>
                <div class="stars">
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
              <p>Great fit, exactly what I was looking for. The material feels very high quality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  container.prepend(productSection);
  let addBtn = productSection.querySelector(".add-to-cart");
  addBtn.onclick = function () {
    addToCart(addBtn, prod);
  };
  accordion();
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
  alert(product.title + " added to cart!");
}

function accordion() {
  var acc = document.getElementsByClassName("accordion");

  for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    };
  }
}
