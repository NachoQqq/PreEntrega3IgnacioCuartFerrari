document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const viewCartButton = document.getElementById('view-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    let products = [];

    // Función para renderizar los productos en la página
    const renderProducts = (filteredProducts) => {
        productList.innerHTML = '';
        filteredProducts.forEach(({ id, name, price, img }) => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            
            // Aplicar AOS con efecto zoom-in
            productCard.setAttribute('data-aos', 'zoom-in');

            productCard.innerHTML = `
                <img src="${img}" alt="${name}">
                <h2>${name}</h2>
                <p>$${price}</p>
                <button class="add-to-cart" data-id="${id}">Agregar al Carrito</button>
            `;
            productList.appendChild(productCard);
        });

        // Añadir eventos a los botones de "Agregar al Carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                addToCart(id);
            });
        });

        // Refrescar AOS después de renderizar los productos
        AOS.refresh();
    };

    // Función para agregar productos al carrito
    const addToCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products.find(product => product.id === id);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayMessage(`${product.name} ha sido agregado al carrito.`);
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (index) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        displayMessage('Producto eliminado del carrito.');
    };

    // Función para renderizar el carrito
    const renderCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        cartItems.innerHTML = '';
        let total = 0;
    
        cart.forEach(({ name, price, img }, index) => {
            total += price;
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${img}" alt="${name}" style="width: 50px; height: 50px;">
                <span>${name} - $${price}</span>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });
    
        cartTotalElement.textContent = total.toFixed(2);
    
        // Añadir eventos a los botones de "Eliminar"
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Detiene la propagación del evento para que no se cierre el carrito
                const index = parseInt(e.target.dataset.index);
                removeFromCart(index);
            });
        });
    };
        

    // Función para mostrar mensajes al usuario
    const displayMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.remove();
        }, 2000);
    };

    // Función para abrir el carrito
    const openCart = () => {
        renderCart(); // Renderizar el carrito cada vez que se abra
        cartSidebar.classList.add('active');
    };

    // Función para cerrar el carrito
    const closeCart = () => {
        cartSidebar.classList.remove('active');
    };

    // Evento para abrir el carrito cuando se hace clic en el botón "Ver Carrito"
    viewCartButton.addEventListener('click', openCart);

    // Evento para cerrar el carrito cuando se hace clic fuera de la sidebar
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !viewCartButton.contains(e.target)) {
            closeCart();
        }
    });

    // Función de búsqueda de productos
    const searchProducts = () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    };

    // Evento para buscar productos cuando se hace clic en el botón de búsqueda
    searchButton.addEventListener('click', searchProducts);

    // Cargar los productos desde el JSON
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            products = data;  // Almacena todos los productos en la variable "products"
            renderProducts(products);  // Renderiza todos los productos inicialmente
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

document.getElementById('checkout').addEventListener('click', () => {
    window.location.href = 'carrito.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list'); // Contenedor para todos los productos
    const featuredList = document.getElementById('featured-list'); // Contenedor para productos destacados
    let products = [];

    // Función para renderizar productos en un contenedor específico
    const renderProducts = (productArray, container) => {
        container.innerHTML = '';
        productArray.forEach(({ id, name, price, img }) => {
            const productCard = document.createElement('div');
            productCard.className = 'card';

            // Aplicar AOS con efecto zoom-in
            productCard.setAttribute('data-aos', 'zoom-in');

            productCard.innerHTML = `
                <img src="${img}" alt="${name}">
                <h2>${name}</h2>
                <p>$${price}</p>
                <button class="add-to-cart" data-id="${id}">Agregar al Carrito</button>
            `;
            container.appendChild(productCard);
        });

        // Añadir eventos a los botones de "Agregar al Carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                addToCart(id);
            });
        });

        // Refrescar AOS después de renderizar los productos
        AOS.refresh();
    };

    // Función para agregar productos al carrito
    const addToCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products.find(product => product.id === id);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayMessage(`${product.name} ha sido agregado al carrito.`);
        }
    };

    // Cargar los productos desde el JSON
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            products = data;

            // Filtrar productos destacados
            const featuredProducts = products.filter(product => product.featured);

            // Renderizar solo 3 productos en la sección "Productos Destacados"
            renderProducts(featuredProducts.slice(0, 3), featuredList);

            // Renderizar todos los productos en la sección "Todos los Productos"
            renderProducts(products, productList);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});