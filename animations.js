const animateCSS = (element, animation, prefix = 'animate__') =>{
  // We create a Promise and return it
    return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  })};

document.getElementById('modal-close').addEventListener('click',()=>{
   hideModal(productsModal);
})
document.getElementById('build-order').addEventListener('click',()=>{
    showModal(productsModal);
})
document.querySelector('.shopping-container').addEventListener('click',()=>{
    showModal(cartModal);
})
document.getElementById('close-cart').addEventListener('click',()=>{
    hideModal(cartModal);
})

function turnCartOn() {
    let border = document.querySelector('.shopping-container');
    let icon = document.querySelector('.shopping-container i');

    border.classList.add('shop-active');
    icon.classList.add('cart-active');
}

function turnCartOff() {
    let border = document.querySelector('.shopping-container');
    let icon = document.querySelector('.shopping-container i');

    border.classList.remove('shop-active');
    icon.classList.remove('cart-active');
}