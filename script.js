const products = [
  {
    id:1,
    name:"Classic Burger",
    price:8500,
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    id:2,
    name:"Cheese Burger",
    price:9200,
    image:"https://images.unsplash.com/photo-1550547660-d9450f859349"
  },
  {
    id:3,
    name:"Papas Fritas",
    price:4000,
    image:"https://images.unsplash.com/photo-1576107232684-1279f390859f"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

function renderProducts(){

  productsContainer.innerHTML = "";

  products.forEach(product => {

    productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Agregar
        </button>
      </div>
    `;
  });

}

function addToCart(id){

  const product = products.find(p => p.id === id);

  cart.push(product);

  saveCart();

  renderCart();

}

function renderCart(){

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item,index) => {

    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>

        <button onclick="removeFromCart(${index})">
          Eliminar
        </button>
      </div>
    `;
  });

  totalElement.textContent = total;

}

function removeFromCart(index){

  cart.splice(index,1);

  saveCart();

  renderCart();

}

function saveCart(){

  localStorage.setItem("cart",JSON.stringify(cart));

}

renderProducts();
renderCart();

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert("El carrito está vacío");

    return;
  }

  alert("Pedido realizado con éxito 🍔");

  cart = [];

  saveCart();

  renderCart();

});