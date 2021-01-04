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
let addBtn = document.querySelectorAll('.add');

productsDB.once('value') //Stores the available products in an object
  .then(function (snap) {
    products = snap.val();
    drawProductList();
    console.log('ready');
  })
  .catch(function (err) {
    console.log('Error', err.code);
});

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
    
    productContainer.dataset.id = product.id;
    
    let productName = document.createElement('h3');
    
    productName.innerText = product.name;
    
    let productPrice = document.createElement('h4');
    
    productPrice.innerText = `${product.price}$`;
    
    let btnContainer = document.createElement('div');
    
    btnContainer.className = 'qty-btn'
    
    let addBtn = document.createElement('button');
    
    addBtn.innerHTML = '<i class="fas fa-cart-arrow-down"></i>';
    
    addBtn.className = 'add';

    addBtn.addEventListener('click', (e) => {
        let items = document.querySelectorAll('.item');
        for (let i = 0; i <= items.length; i++) {
            let product = (e.target).parentElement.parentElement.parentElement;
            if (items[i] !== undefined) {
                if (items[i].dataset.id == product.dataset.id) {
                    alert('This item is already added to the cart')
                    return;
                }
            }else{
                addCartItem(product);
            }
        }
    })
    
    btnContainer.append(addBtn);
    
    productContainer.append(productName,productPrice,btnContainer);
    
    category.append(productContainer);
}

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

function addCartItem(item) {
    let cartItemContainer = document.createElement('div');
    
    cartItemContainer.className = 'item';
    
    cartItemContainer.dataset.id = item.dataset.id;
    
    let itemName = document.createElement('p');
    
    itemName.innerText = item.querySelector('h3').innerText;
    
    cartItemContainer.append(itemName);

    let qty = document.createElement('input');

    qty.value = 1;
    
    qty.setAttribute('type','number');

    qty.className = 'qty-input';

    qty.addEventListener('change', quantityChanged);

    let removeBtn = document.createElement('button');

    removeBtn.innerText = 'X';

    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', (e)=> {
        let buttonClicked = e.target.parentElement;
        buttonClicked.remove();
    })
    
    cartItemContainer.append(qty,itemName,removeBtn);

    cartItems.append(cartItemContainer);

    items = document.querySelectorAll('.item');
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }else if(input.value > 99) {
        input.value = 99
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
cartBtn.addEventListener('click', function(){
    showModal(cartModal);
})

document.getElementById('close-cart').addEventListener('click', ()=>{
    hideModal(cartModal)
});

modalShowBtn.addEventListener('click', function(){
    showModal(productsModal);
});
modalClose.addEventListener('click', hideModal);
productsModal.addEventListener('click',(e)=> {
    if(e.target == modal) {
        hideModal(productsModal);
    }
})
