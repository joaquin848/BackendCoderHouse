let products = [];
let error = "";
const cart = document.getElementById("cart");
const cartId = cart.innerText.replace("Cart: ", "");
const productsList = document.getElementById("productsList");

async function getAllProducts() {
  try {
    const response = await fetch(`http://localhost:8080/api/carts/${cartId}`);
    const responseJson = await response.json();

    products = [...responseJson.products];

    compileProducts();
  } catch (err) {
    error = err;
  }
}

function compileProducts() {
  const productsTemplate = products
    .map(
      (product) => `<li>
      <p>ID: ${product.productId._id} Quantity: ${product.quantity}</p>
      <p>Title: ${product.productId.title}</p>
      <p>Description: ${product.productId.description}</p>
      <p>Price: ${product.productId.price}</p>
      <p>Code: ${product.productId.code}</p>
      <p>Stock: ${product.productId.stock}</p>
    </li>`
    )
    .join(" ");
  productsList.innerHTML = productsTemplate;
}

getAllProducts();