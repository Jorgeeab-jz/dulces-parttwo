const firebaseConfig = {
    apiKey: "AIzaSyBhEEjKEDyuJQ0fXY0R3VyMvssNEffLaMI",
    authDomain: "dulces-vicky.firebaseapp.com",
    databaseURL: "https://dulces-vicky-default-rtdb.firebaseio.com",
    projectId: "dulces-vicky",
    storageBucket: "dulces-vicky.appspot.com",
    messagingSenderId: "877270025588",
    appId: "1:877270025588:web:f8ad1aab9cfb9106935821",
    measurementId: "G-TE0KQKQ16F"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const dulcesDB = firebase.database();
const productsDB = dulcesDB.ref().child('productos');
let products = {};
////////////////////////////////////////////////////////////////////////////////////////
const productsModal = document.getElementById('modal');
const modalClose = document.querySelector('.order-builder span');
const modalShowBtn = document.getElementById('build-order');
const cartBtn = document.querySelector('.shopping-container');
const shopIcon = document.querySelector('.shopping-container i');
const cartModal = document.querySelector('.cart-modal');
const cartItems = document.querySelector('.cart-items');

function drawProductList() {
    for (const [key,value] of Object.entries(products)) {
         drawCategory(`${key}`);
         let currentProduct = value;
         let productCategory = document.getElementById(`${key}`);
         for (const [name,content] of Object.entries(currentProduct)) {
            drawProducts(content,productCategory);
         }
      }
    
    
}


function drawCategory(productType) {
    let productList = document.getElementById('product-list');
    let category = document.createElement('details');
    let title = document.createElement('summary');
    category.append(title);
    category.setAttribute('id',productType);
    title.innerText = productType;
    productList.append(category);
}

function drawProducts(product,category) {
    let productContainer = document.createElement('div');
    productContainer.className = 'product';
    let productName = document.createElement('h3');
    productName.innerText = product.name;
    let productPrice = document.createElement('h4');
    productPrice.innerText = product.price
    let btnContainer = document.createElement('div');
    btnContainer.className = 'qty-btn'
    let addBtn = document.createElement('button');
    addBtn.innerText = '+';
    let lessBtn = document.createElement('button');
    lessBtn.innerText = '-';
    btnContainer.append(addBtn,lessBtn);
    productContainer.append(productName,productPrice,btnContainer);
    category.append(productContainer);
}

productsDB.once('value') //Stores the available products in an object
  .then(function (snap) {
    products = snap.val();
  })
  .catch(function (err) {
    console.log('Error', err.code);
});

function showModal(modal) {
    modal.style.display = 'block';
}
function hideModal(modal) {
    modal.style.display = 'none';
}
function addTotal() {
    let total = qtyDisplay.value * rdc.price;
    totalDisplay.textContent = `${(Math.round(total * 10) / 10)}$`;
}

cartBtn.addEventListener('click', function(){
    showModal(cartModal);
})
document.addEventListener('click', (e) => {
    if(e.target !== cartModal && e.target !== cartBtn && e.target !== shopIcon){
        hideModal(cartModal);
    }
} )
modalShowBtn.addEventListener('click', function(){
    showModal(productsModal);
});
modalClose.addEventListener('click', hideModal);
productsModal.addEventListener('click',(e)=> {
    if(e.target == modal) {
        hideModal(productsModal);
    }
})

