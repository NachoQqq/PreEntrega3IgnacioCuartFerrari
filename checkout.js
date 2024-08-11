document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const alertBox = document.getElementById('alert');
    const productListAlert = document.getElementById('product-list-alert');
    const closeAlertButton = document.getElementById('close-alert');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Recopilar los datos del formulario
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const dni = document.getElementById('dni').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        // Obtener los productos del carrito desde localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        productListAlert.innerHTML = '';  // Limpiar el contenido anterior

        // Mostrar los productos en la alerta
        cart.forEach(product => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <span>${product.name} - $${product.price}</span>
            `;
            productListAlert.appendChild(productItem);
        });

        // Mostrar la alerta
        alertBox.style.display = 'block';

        // Limpiar el carrito después de la compra
        localStorage.removeItem('cart');
    });

    // Cerrar la alerta cuando se haga clic en el botón "Cerrar"
    closeAlertButton.addEventListener('click', () => {
        alertBox.style.display = 'none';
        window.location.href = 'index.html'; // Redirigir a la página principal o a la que prefieras
    });
});
