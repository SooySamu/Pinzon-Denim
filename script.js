// --- 1. FUNCIÓN DE FORMATEO DE PRECIO ---
function formatPrice(number) {
  if (number === undefined || number === null) return "$0 COP";
  return '$' + Number(number).toLocaleString('es-CO') + ' COP';
}

// --- 2. COMPONENTES GLOBALES (INYECCIÓN AUTOMÁTICA) ---
document.addEventListener("DOMContentLoaded", () => {
  inyectarHeader();
  inyectarFooter();
  inyectarCarrito();

  // Dar tiempo a que el HTML inyectado exista en el navegador antes de asignar eventos
  setTimeout(() => {
    inicializarEventosGlobales();
    if (typeof updateCartUI === "function") updateCartUI();
  }, 50);
});

function inyectarHeader() {
  const headerRoot = document.getElementById("header-root");
  if (!headerRoot) return;

  headerRoot.innerHTML = `
    <header class="main-header">
      <div class="header-container">
        
        <!-- 1. IZQUIERDA (CELULAR): BOTÓN HAMBURGUESA -->
        <button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Abrir menú">
          <i class="fa-solid fa-bars"></i>
        </button>

        <!-- 2. CENTRO (CELULAR) / IZQUIERDA (PC): LOGO PINZÓN -->
        <a href="index.html" class="logo-link">
          <img src="Images/Logo.png" alt="Pinzón Logo" style="height: 32px; width: auto;">
          <span style="font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">PINZÓN</span>
        </a>

        <!-- 3. MENÚ DE NAVEGACIÓN (SE CONVIERTE EN DRAWER EN MÓVIL) -->
        <nav id="mobileNav" class="nav-menu">
          <a href="index.html" style="text-decoration: none; color: #111;">Inicio</a>
          
          <div style="position: relative; padding: 0.25rem 0;" class="nav-item-dropdown">
            <a href="catalogo.html?categoria=todos" style="text-decoration: none; color: #111;">Catálogo <i class="fa-solid fa-chevron-down" style="font-size: 10px;"></i></a>
            <div class="dropdown-menu">
              <div>
                <h4>Público</h4>
                <ul style="list-style: none; padding: 0;">
                  <li><a href="catalogo.html?categoria=hombre" style="text-decoration: none; color: #111;">Hombre</a></li>
                  <li><a href="catalogo.html?categoria=mujer" style="text-decoration: none; color: #111;">Mujer</a></li>
                  <li><a href="catalogo.html?categoria=nino" style="text-decoration: none; color: #111;">Niño</a></li>
                </ul>
              </div>
              <div>
                <h4>Línea Denim</h4>
                <ul style="list-style: none; padding: 0;">
                  <li><a href="catalogo.html?categoria=jeans" style="text-decoration: none; color: #111;">Jeans Holgados</a></li>
                  <li><a href="catalogo.html?categoria=faldas" style="text-decoration: none; color: #111;">Faldas</a></li>
                  <li><a href="catalogo.html?categoria=shorts" style="text-decoration: none; color: #111;">Shorts</a></li>
                  <li><a href="catalogo.html?categoria=enterizos" style="text-decoration: none; color: #111;">Enterizos</a></li>
                  <li><a href="catalogo.html?categoria=bermudas" style="text-decoration: none; color: #111;">Bermudas</a></li>
                  <li><a href="catalogo.html?categoria=tops" style="text-decoration: none; color: #111;">Tops</a></li>
                </ul>
              </div>
            </div>
          </div>
          <a href="nosotros.html" style="text-decoration: none; color: #111;">Nosotros</a>
          <a href="#contacto" style="text-decoration: none; color: #111;">Contacto</a>
        </nav>

        <!-- 4. DERECHA (CELULAR Y PC): LUPA Y CARRITO -->
        <div class="header-actions">
          <div style="position: relative; display: flex; align-items: center;">
            <button id="searchBtnGlobal" style="background: none; border: none; cursor: pointer; padding: 0.5rem; font-size: 1rem;"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" id="searchInputGlobal" style="position: absolute; right: 0; width: 240px; background-color: #f3f4f6; font-size: 0.875rem; padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid #d1d5db; display: none; z-index: 20;" placeholder="Buscar prendas...">
          </div>
          <button id="cartBtnGlobal" style="background: none; border: none; cursor: pointer; padding: 0.5rem; font-size: 1rem; position: relative;">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="cart-count" style="position: absolute; top: 0; right: 0; background: #000; color: #fff; font-size: 10px; width: 16px; height: 16px; border-radius: 50%; display: none; align-items: center; justify-content: center;">0</span>
          </button>
        </div>

      </div>
    </header>
  `;
}

function inyectarFooter() {
  const footerRoot = document.getElementById("footer-root");
  if (!footerRoot) return;
  footerRoot.innerHTML = `
    <footer id="contacto" style="background-color: #ffffff; border-top: 1px solid #e5e7eb; font-size: 0.875rem; color: #4b5563; padding-top: 3rem; padding-bottom: 2rem;">
      <div style="max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
        
        <div>
          <h4 style="font-weight: 700; color: #000; text-transform: uppercase; margin-bottom: 1rem;">Recursos Pinzón</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Buscar Tienda / Showroom</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Catálogo Mayorista (B2B)</a></li>
            <li><a href="#" style="color: #4b5563; text-decoration: none;">Guía de Tallas</a></li>
          </ul>
        </div>

        <div>
          <h4 style="font-weight: 700; color: #000; text-transform: uppercase; margin-bottom: 1rem;">Ayuda</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Obtener Ayuda</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Estado de Pedido</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Envío y Entrega</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4b5563; text-decoration: none;">Devoluciones</a></li>
            <li><a href="#" style="color: #4b5563; text-decoration: none;">Opciones de Pago</a></li>
          </ul>
        </div>

        <div>
          <h4 style="font-weight: 700; color: #000; text-transform: uppercase; margin-bottom: 1rem;">Acerca de Pinzón</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="nosotros.html" style="color: #4b5563; text-decoration: none;">Historia de la Marca</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="nosotros.html" style="color: #4b5563; text-decoration: none;">Taller Bosa & Confección Ética</a></li>
            <li><a href="nosotros.html" style="color: #4b5563; text-decoration: none;">Impacto Social</a></li>
          </ul>
        </div>

        <div>
          <h4 style="font-weight: 700; color: #000; text-transform: uppercase; margin-bottom: 1rem;">Síguenos</h4>
          <div style="display: flex; gap: 1rem; font-size: 1.25rem; margin-bottom: 1rem;">
            <a href="#" style="color: #000;"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" style="color: #000;"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" style="color: #000;"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#" style="color: #000;"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
          <p style="font-size: 0.75rem;">Atención personalizada y ventas directas vía WhatsApp.</p>
        </div>
      </div>
      
      <div style="max-width: 1280px; margin: 2rem auto 0; padding-top: 1rem; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; flex-wrap: wrap; font-size: 0.75rem;">
        <p>© 2026 Pinzón Inc. Todos los derechos reservados.</p>
        <div style="display: flex; gap: 1.5rem;">
          <a href="#" style="color: #6b7280; text-decoration: none;">Términos de Venta</a>
          <a href="#" style="color: #6b7280; text-decoration: none;">Términos de Uso</a>
          <a href="#" style="color: #6b7280; text-decoration: none;">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  `;
}

function inyectarCarrito() {
  const cartRoot = document.getElementById("cart-root");
  if (!cartRoot) return;
  cartRoot.innerHTML = `
    <div id="cartModal" class="cart-modal">
      <div id="cartBackdrop" class="cart-backdrop"></div>
      <div id="cartPanel" class="cart-panel">
        <div>
          <div class="cart-header">
            <h3 class="font-serif-custom" style="font-size: 1.25rem; font-weight: 700;">Tu Carrito</h3>
            <button id="closeCart" class="icon-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div id="cartItemsList" style="padding: 1rem 0; overflow-y: auto; max-height: 60vh;"></div>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 1rem;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 1rem;">
            <span>Total:</span>
            <span id="cartTotalDisplay">$0 COP</span>
          </div>
          <button onclick="sendOrderToWhatsApp()" class="btn-whatsapp" style="width: 100%; border: none; cursor: pointer;">
            <i class="fa-brands fa-whatsapp"></i> Hacer Pedido
          </button>
        </div>
      </div>
    </div>
  `;
}

function inicializarEventosGlobales() {
  const searchBtn = document.getElementById("searchBtnGlobal");
  const searchInput = document.getElementById("searchInputGlobal");
  const cartBtn = document.getElementById("cartBtnGlobal");
  const closeCartBtn = document.getElementById("closeCart");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartModal = document.getElementById("cartModal");
  
  // NUEVO: Variables para menú hamburguesa móvil
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  // Evento Menú Hamburguesa Móvil
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
  }

  // Evento Buscador
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      searchInput.style.display = searchInput.style.display === "block" ? "none" : "block";
      if (searchInput.style.display === "block") searchInput.focus();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        window.location.href = `catalogo.html?categoria=todos&search=${e.target.value}`;
      }
    });
  }

  // Evento Abrir Carrito
  if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", () => cartModal.classList.add("open"));
  }

  if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener("click", () => cartModal.classList.remove("open"));
  }

  if (cartBackdrop && cartModal) {
    cartBackdrop.addEventListener("click", () => cartModal.classList.remove("open"));
  }
}

// --- 3. LÓGICA DEL CATÁLOGO (CARGA DESDE PRODUCTS.JSON) ---
let productosGlobal = [];

async function cargarCatalogo() {
  const grid = document.getElementById("productGrid");
  if (!grid) return; // Si no estamos en catalogo.html, no hace nada

  try {
    const respuesta = await fetch("products.json");
    if (!respuesta.ok) throw new Error(`HTTP error! status: ${respuesta.status}`);

    productosGlobal = await respuesta.json();
    renderizarProductos(productosGlobal);

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('categoria') || 'todos';
    const searchFromUrl = urlParams.get('search');

    if (searchFromUrl) {
      filtrarBusqueda(searchFromUrl);
    } else {
      applyFilter(categoryFromUrl, null);
    }
  } catch (error) {
    console.error("Error cargando productos:", error);
    grid.innerHTML = `<p style="text-align:center; padding: 2rem;">Error cargando el catálogo de Pinzón. Revisa la consola (F12).</p>`;
  }
}

// --- 3.1 RENDERIZADO INTERACTIVO DEL CATÁLOGO ---
function renderizarProductos(productos) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = "";

  productos.forEach(producto => {
    const imgPortada = producto.colores[0].imagenes[0];
    
    // Generar bolitas de color verticales en la esquina superior derecha
    const coloresHTML = producto.colores.map((col, idx) => `
      <div class="card-color-dot ${idx === 0 ? 'activo' : ''}" 
           style="background-color: ${col.hex};" 
           title="${col.nombre}"
           onclick="cambiarColorTarjeta(event, '${producto.id}', '${col.imagenes[0]}', this)">
      </div>
    `).join("");

    // Generar insignias de tallas para el degradado inferior en hover
    const tallasHTML = producto.tallas.map(talla => `
      <span class="card-size-badge">${talla}</span>
    `).join("");

    grid.innerHTML += `
      <div class="product-card" data-category="${producto.categorias.join(" ")}" style="display:flex; flex-direction:column;">
        
        <div class="product-img-wrapper">
          <!-- Bolitas de color en la esquina superior derecha -->
          <div class="card-color-swatches">
            ${coloresHTML}
          </div>

          <!-- Imagen con enlace a la vista de detalle -->
          <a href="producto.html?id=${producto.id}">
            <img src="${imgPortada}" id="img-card-${producto.id}" class="product-img" alt="${producto.titulo}">
          </a>

          <!-- Degradado inferior visible en Hover con las tallas -->
          <div class="card-sizes-overlay">
            ${tallasHTML}
          </div>
        </div>

        <!-- Información de la prenda -->
        <a href="producto.html?id=${producto.id}" style="text-decoration:none; color:inherit;">
          <div class="product-info" style="padding-top: 0.75rem;">
            <span class="product-tag">${producto.etiqueta}</span>
            <h3 class="product-title" style="margin: 0.25rem 0;">${producto.titulo}</h3>
            <span class="product-price">${formatPrice(producto.precio)}</span>
          </div>
        </a>

      </div>
    `;
  });
}

// --- 3.2 INTERACCIÓN DE CAMBIO DE COLOR EN TARJETA ---
function cambiarColorTarjeta(event, productoId, nuevaImg, elementoDot) {
  event.preventDefault();
  event.stopPropagation(); // Evita redirigir a producto.html al hacer clic en el círculo

  const imgCard = document.getElementById(`img-card-${productoId}`);
  if (!imgCard) return;

  // Transición suave de opacidad
  imgCard.style.opacity = 0;
  setTimeout(() => {
    imgCard.src = nuevaImg;
    imgCard.style.opacity = 1;
  }, 200);

  // Marcar el círculo activo
  const container = elementoDot.parentElement;
  container.querySelectorAll('.card-color-dot').forEach(dot => dot.classList.remove('activo'));
  elementoDot.classList.add('activo');
}
let filtrosActivos = [];

function applyFilter(category, clickedBtn) {
  const cards = document.querySelectorAll('.product-card');
  const buttons = document.querySelectorAll('.filter-btn');

  // 1. Si se selecciona "todos" o "Ver Todo", reiniciamos los filtros activos
  if (category === 'todos') {
    filtrosActivos = [];
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Marcar activo solo el botón "Ver Todo"
    buttons.forEach(btn => {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes("'todos'")) {
        btn.classList.add('active');
      }
    });
  } else {
    // Desmarcar el botón "Ver Todo" si se selecciona una categoría específica
    buttons.forEach(btn => {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes("'todos'")) {
        btn.classList.remove('active');
      }
    });

    // 2. Alternar (Toggle): si ya está en la lista se quita, si no se agrega
    const index = filtrosActivos.indexOf(category);
    if (index > -1) {
      filtrosActivos.splice(index, 1);
      if (clickedBtn) clickedBtn.classList.remove('active');
    } else {
      filtrosActivos.push(category);
      if (clickedBtn) clickedBtn.classList.add('active');
    }

    // Si la llamada viene por URL (clickedBtn es null), iluminar los botones activos correspondientes
    if (!clickedBtn) {
      buttons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${category}'`)) {
          btn.classList.add('active');
        }
      });
    }

    // Si se desmarcaron todos los filtros, volver a activar "Ver Todo" por defecto
    if (filtrosActivos.length === 0) {
      buttons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes("'todos'")) {
          btn.classList.add('active');
        }
      });
    }
  }

  // 3. Evaluar cada prenda: debe contener TODOS los filtros de la lista `filtrosActivos`
  cards.forEach(card => {
    const itemCategories = card.getAttribute('data-category').split(' ');

    if (filtrosActivos.length === 0) {
      card.style.display = 'flex';
    } else {
      // Verificación acumulativa: ¿La prenda contiene cada uno de los filtros seleccionados?
      const cumpleTodosLosFiltros = filtrosActivos.every(filtro => itemCategories.includes(filtro));
      
      if (cumpleTodosLosFiltros) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

function filtrarBusqueda(searchTerm) {
  const term = searchTerm.toLowerCase();
  const cards = document.querySelectorAll('.product-card');
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

  cards.forEach(card => {
    const title = card.querySelector('.product-title').innerText.toLowerCase();
    const tags = card.querySelector('.product-tag').innerText.toLowerCase();
    if (title.includes(term) || tags.includes(term)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarCatalogo);

// --- 4. GESTIÓN DEL CARRITO DE COMPRAS, LOCALSTORAGE Y WHATSAPP ---

let cart = JSON.parse(localStorage.getItem('pinzonCart')) || [];
const phoneNumber = '573002149202'; // Número de WhatsApp Pinzón

function saveCart() {
  localStorage.setItem('pinzonCart', JSON.stringify(cart));
}

// Función global para añadir prendas (usada desde producto.html)
function addToCart(title, price, imgUrl, talla, color) {
  // Buscar si ya existe la misma prenda con la MISMA talla y MISMO color
  const existingItem = cart.find(item => item.title === title && item.talla === talla && item.color === color);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      title: title,
      price: price,
      imgUrl: imgUrl,
      talla: talla,
      color: color,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  
  // Abrir modal del carrito automáticamente
  const cartModal = document.getElementById('cartModal');
  if (cartModal) cartModal.classList.add('open');
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

// Eliminación con animación suave
function removeFromCart(index, btnElement) {
  const itemElement = btnElement ? btnElement.closest('.cart-item') : null;
  
  if (itemElement) {
    // 1. Desencadena la animación de fade-out y colapso de espacio
    itemElement.classList.add('removing');

    // 2. Espera 300ms a que el elemento se reduzca totalmente a 0px de altura
    setTimeout(() => {
      cart.splice(index, 1);
      saveCart();
      updateCartUI();
    }, 300);
  } else {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
  }
}

function updateCartUI() {
  const cartList = document.getElementById('cartItemsList');
  const totalDisplay = document.getElementById('cartTotalDisplay');
  const cartCountIcons = document.querySelectorAll('.cart-count');
  
  if (!cartList || !totalDisplay) return;

  cartList.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartList.innerHTML = '<p style="text-align: center; color: #6b7280; margin-top: 2rem;">Tu carrito está vacío.</p>';
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      totalItems += item.quantity;
      
      cartList.innerHTML += `
        <div class="cart-item">
          <img src="${item.imgUrl}" style="width: 64px; height: 72px; object-fit: cover; border-radius: 4px;">
          <div style="flex: 1;">
            <h4 style="font-weight: 700; font-size: 0.875rem; margin: 0;">${item.title}</h4>
            <p style="font-size: 0.75rem; color: #6b7280; margin: 2px 0;">Talla: <strong>${item.talla}</strong> | Color: <strong>${item.color}</strong></p>
            <span style="font-size: 0.875rem; font-weight: 600;">${formatPrice(item.price)}</span>
            
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <button onclick="changeQuantity(${index}, -1)" style="border: 1px solid #e5e7eb; background: #fff; width: 24px; height: 24px; border-radius: 50%; cursor: pointer;">-</button>
              <span style="font-size: 0.875rem; font-weight: 500; width: 16px; text-align: center;">${item.quantity}</span>
              <button onclick="changeQuantity(${index}, 1)" style="border: 1px solid #e5e7eb; background: #fff; width: 24px; height: 24px; border-radius: 50%; cursor: pointer;">+</button>
              
              <button onclick="removeFromCart(${index}, this)" style="margin-left: auto; color: #ef4444; border: none; background: none; font-size: 0.875rem; cursor: pointer;">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  totalDisplay.innerText = formatPrice(total);
  
  cartCountIcons.forEach(icon => {
    icon.innerText = totalItems;
    icon.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega prendas para solicitar tu pedido.");
    return;
  }

  let orderText = "Hola *Pinzón*, me gustaría realizar el siguiente pedido:\n\n";
  let total = 0;

  cart.forEach(item => {
    let subtotal = item.price * item.quantity;
    total += subtotal;
    orderText += `- ${item.quantity}x ${item.title}\n  *Talla:* ${item.talla} | *Color:* ${item.color}\n  *Subtotal:* ${formatPrice(subtotal)}\n\n`;
  });

  orderText += `*TOTAL A PAGAR: ${formatPrice(total)}*\n\nQuedo atento(a) para coordinar el pago y envío.`;

  const encodedText = encodeURIComponent(orderText);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
}