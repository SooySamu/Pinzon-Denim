// Buscador Desplegable
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  searchInput.classList.toggle('active');
  if (searchInput.classList.contains('active')) {
    searchInput.focus();
  }
});

// Carrito Lateral (Slide-Over)
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartModal = document.getElementById('cartModal');
const cartBackdrop = document.getElementById('cartBackdrop');

cartBtn.addEventListener('click', () => {
  cartModal.classList.add('open');
});

function closeCartMenu() {
  cartModal.classList.remove('open');
}

closeCart.addEventListener('click', closeCartMenu);
cartBackdrop.addEventListener('click', closeCartMenu);