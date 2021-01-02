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
const products = dulcesDB.ref().child('productos');
let rolls = products.child('rolls');
////////////////////////////////////////////////////////////////////////////////////////
const productsModal = document.getElementById('modal');
const modalClose = document.querySelector('.order-builder span');
const modalShowBtn = document.getElementById('build-order');
const orderSubmitBtn = document.getElementById('order-submit');
const qtyDisplay = document.getElementById('qty-display');
const totalDisplay = document.getElementById('total-display');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
const cartBtn = document.querySelector('.shopping-container');
const shopIcon = document.querySelector('.shopping-container i');
const cartModal = document.querySelector('.cart-modal');

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
addBtn.addEventListener('click', ()=> {
    qtyDisplay.value++
    addTotal();
})

removeBtn.addEventListener('click', ()=> {
    if(qtyDisplay.value >= 1) {
        qtyDisplay.value--
    }
    addTotal();
})

