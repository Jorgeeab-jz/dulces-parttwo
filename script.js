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
const cartModal = document.querySelector('.cart-modal');
const cartItems = document.querySelector('.cart-items');
let addBtn;
let message = '';
let total = 0;

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

    productContainer.dataset.price= product.price;
    
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
                    alert('Esto ya está en el carrito');
                    return;
                }
            }else{
                if (product.dataset.price !== undefined) {
                    addCartItem(product);
                    updateOrder();
                    animateCSS('.shopping-container', 'swing');
                    turnCartOn();
                }
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

    cartItemContainer.dataset.price = item.dataset.price;
    
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
        updateTotal();
        updateOrder();
    })
    
    cartItemContainer.append(qty,itemName,removeBtn);

    cartItems.append(cartItemContainer);

    items = document.querySelectorAll('.item');

    updateTotal();
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }else if(input.value > 99) {
        input.value = 99
    }
    updateTotal();
    updateOrder();
}

function updateTotal() {
    let items = document.querySelectorAll('.item');
    total = 0;
    items.forEach(item => {
        let qty = Number(item.querySelector('input').value);
        let price = Number(item.dataset.price);
        let itemTotal = qty * price;
        total += itemTotal;
    })
    total = Math.round(total * 10) / 10;
    if(total == 0){
        turnCartOff();
    }
    document.querySelector('.total-display').innerText = `${total}$`;
}

function updateOrder() {
    let items = [...document.querySelectorAll('.item')];
 
    let order = items.map(item =>{
        let itemQty = item.querySelector('input').value;
        let itemName = item.querySelector('p').innerText;
        let itemOrder = {
            qty: itemQty,
            name: itemName
        }
        return itemOrder;
    },[])

    let orderMessage = order.map(item =>{
        let line = `\n${item.qty} ${item.name}`;
        return line;
    },'')
    
    message = `Pedido:${orderMessage}\nTOTAL: ${total}$`;
}

function sendOrder() {
    let orderMessage = encodeURI(message);
    if (total > 0) {
        window.open(`https://wa.me/584121822719?text=${orderMessage}`);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('send').addEventListener('click',sendOrder);