const form = document.querySelector("form");
const productInput = document.querySelector("#productInput");
const list = document.querySelector("ul");
const cartButton = document.querySelector("#addToCart");
const resetButton = document.querySelector("[data-reset]");
const productFilter = document.querySelector("[data-filter]");

// Tailwind classes
const removeButtonClass =
    "invisible group-hover/item:visible text-sm font-semibold text-red-800 bg-red-100 hover:bg-red-200 dark:bg-pink-500 px-2 py-0.5 rounded ml-auto",
  liClass =
    "list flex gap-4 items-center group/item hover:bg-slate-50 p-2 rounded-lg min-w-48",
  liIconClass =
    "inline-flex items-center justify-center size-[46px] text-sm font-semibold leading-none rounded-full bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white group-hover/item:bg-white";

// Display products from localStorage
function displayProducts() {
  const productsInStorage = getProductsFromStorage();
  productsInStorage.forEach((product) => addProductToDOM(product));
}

function addProduct(e) {
  e.preventDefault();

  const newProduct = productInput.value;

  addProductToDOM(newProduct);
  addProductToStorage(newProduct);
}

// Create a new LI from input
function addProductToDOM(item) {
  // Create new list item
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    )
  );

  // Create list icon
  // Take first two letters of value
  let caps = item.slice(0, 2).toUpperCase();

  if (item.toLowerCase().includes("coffee")) {
    caps = "☕︎";
  } else if (item.toLowerCase().includes("cookie")) {
    caps = "🍪";
  } else if (item.toLowerCase().includes("croissant")) {
    caps = "🥐";
  }

  const liIcon = createLiIcon(liIconClass, caps);
  li.insertAdjacentElement("afterbegin", liIcon);

  // Create remove button
  const removeButton = createButton(removeButtonClass);
  li.appendChild(removeButton);

  li.className = liClass;

  list.appendChild(li);
  productInput.value = "";
  addToCartState();
  hideUI();
}
// Create an "icon" with 2 initial letters
function createLiIcon(classes, caps) {
  const icon = document.createElement("span");
  icon.className = classes;
  icon.appendChild(document.createTextNode(caps));
  return icon;
}

// Create small remove icon
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  button.setAttribute("data-action-remove", "");
  button.textContent = "x";
  return button;
}

// Add list item to Local storage
function addProductToStorage(item) {
  const productsInStorage = getProductsFromStorage();

  productsInStorage.push(item);

  // Convert to JSON string
  localStorage.setItem("items", JSON.stringify(productsInStorage));
}

function getProductsFromStorage() {
  let productsInStorage;

  if (localStorage.getItem("items") === null) {
    productsInStorage = [];
  } else {
    productsInStorage = JSON.parse(localStorage.getItem("items"));
  }
  return productsInStorage;
}

// Modify item on click
function onClickProduct(e) {
  if (e.target.hasAttribute("data-action-remove")) {
    removeProduct(e.target.parentElement);
  }
}

// Removes the product on icon click
function removeProduct(item) {
  item.remove();
  removeProductFromStorage(item.childNodes[1].textContent);
  hideUI();
}

function removeProductFromStorage(item) {
  let productsFromStorage = getProductsFromStorage();

  productsFromStorage = productsFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(productsFromStorage));
}

// Removes all products and hides elements
function clearList() {
  list.replaceChildren();
  localStorage.removeItem("items");
  hideUI();
}
// Hides elements when cart is empty
function hideUI() {
  if (list.childElementCount === 0) {
    resetButton.style.display = "none";
    productFilter.style.display = "none";
  } else {
    resetButton.style.display = "block";
    productFilter.style.display = "block";
  }
}
// Makes addToCart button disabled, when input is empty
function addToCartState() {
  if (productInput.value === "") {
    cartButton.setAttribute("disabled", "");
  } else cartButton.removeAttribute("disabled", "");
}

// productFilter products
function filterProducts(e) {
  const products = list.querySelectorAll("li");
  const filterText = productFilter.value.toLowerCase();
  products.forEach((product) => {
    // In cart product name
    const productInCart = product.childNodes[1].textContent.toLowerCase();
    if (productInCart.indexOf(filterText) !== -1) {
      product.style.display = "flex";
    } else product.style.display = "none";
  });
}

// Init app
function init() {
  form.addEventListener("submit", addProduct);
  list.addEventListener("click", onClickProduct);
  resetButton.addEventListener("click", clearList);
  productInput.addEventListener("input", addToCartState);
  productFilter.addEventListener("input", filterProducts);
  document.addEventListener("DOMContentLoaded", displayProducts);

  hideUI();
  addToCartState();
}

init();
// 104
