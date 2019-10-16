// Variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Main cart
let cart = [];

// Getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();

      // destructuring key value pair from a field in object in json file
      let products = data.items;
      products = products.map(item => {
        const {title,price} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        return {title, price,id, image};
      }) 
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// Display products
class UI {
  displayProducts(products) {
    console.log(products);
    let result='';
    products.forEach(product => {
      result += `
      <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img class="product-img" src=${product.image} alt="product 1">
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
      <!-- end of single product -->
      `;
    });
    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    // Select all the add to bag buttons after the product loaded
    const buttons = [...document.querySelectorAll('.bag-btn')];
    // console.log(buttons);
    buttons.forEach(button => {
      let id = button.dataset.id;
      // console.log(id);

      // Find item in the cart
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      else {
        button.addEventListener('click', (event) => {
          console.log(event);
          event.target.innerText= "In Cart";
          event.target.disabled = true;

          // get product from products

          // add product to the cart
          
        });
      }
    });
  }
}

// Local storage
class Storage {
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// Event listener
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // Get all products
  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProduct(products);
  }).then(() => {
    ui.getBagButtons();
  });
});
























