let cartLen = document.getElementById("cart-length");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartLen.textContent = `${cart.length}`;
let itemsContainer = document.getElementById("cartContainer");

function drawCart() {
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    DrawItem(cart[i], i);
  }
}
function drawSummary() {
  let summaryContainer = document.querySelector(".summary");
  let totalDiv = document.querySelector(".main-sec .right .total");
  summaryContainer.innerHTML = "";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
    let itemdiv = document.createElement("div");
    itemdiv.classList.add("summary-item");
    itemdiv.innerHTML = `
                <span style="color: #9db9a8;">subtotal</span>
                <span style="color: #fff;">$ ${cart[i].price}</span> 
    `;
    summaryContainer.appendChild(itemdiv);
  }
  totalDiv.innerHTML = `
   <h3>Order Total</h3>
              <h2>$${total.toFixed(2)}</h2>
  `;
}
drawSummary();
function DrawItem(item, index) {
  let itemDiv = document.createElement("div");
  itemDiv.classList.add("item");
  itemDiv.innerHTML = `
        <img src="${item.thumbnail}" alt="" />
        <div class="en">
          <div class="desc">
            <h3>${item.title}</h3>
            <div class="price">$${item.price}</div>
          </div>
          <div class="props">
            <span>Size: M, Color: White</span>
          </div>
          <div class="actions">
            <div class="quantity">
              <button class="minus">-</button>
              <span class="num">1</span>
              <button class="plus">+</button>
            </div>
            <div class="remove">
              <button class="remove-btn">
                <i class="fa-regular fa-trash-can"></i>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>`;

  itemsContainer.appendChild(itemDiv);

  let removeBtn = itemDiv.querySelector(".remove-btn");
  removeBtn.onclick = function () {
    remove(index);
  };
}

function remove(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  drawCart();
  drawSummary();
}

drawCart();
