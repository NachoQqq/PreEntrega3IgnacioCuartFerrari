                    document.addEventListener('DOMContentLoaded', () => {
                        const products = [
                            { id: 1, name: 'Air Jordan 1 High "Dark Mocha"', price: 500, img: './assets/sneaker1.jpg' },
                            { id: 2, name: 'Air Jordan 4 "Military Black"', price: 440, img: './assets/sneaker2.jpg' },
                            { id: 3, name: 'Hoodie Essentials', price: 110, img: './assets/hoodie1.jpg' },
                        ];

                        const productList = document.getElementById('product-list');
                        const viewCartButton = document.getElementById('view-cart');
                        const cartDiv = document.getElementById('cart');
                    
                        localStorage.removeItem('cart');

                        const renderProducts = () => {
                            productList.innerHTML = '';
                            products.forEach(({ id, name, price, img }) => {
                                const productCard = document.createElement('div');
                                productCard.className = 'card';
                                productCard.innerHTML = `
                                    <img src="${img}" alt="${name}">
                                    <h2>${name}</h2>
                                    <p>$${price}</p>
                                    <button class="add-to-cart" data-id="${id}">Agregar al Carrito</button>
                                `;
                                productList.appendChild(productCard);
                            });

                            document.querySelectorAll('.add-to-cart').forEach(button => {
                                button.addEventListener('click', (e) => {
                                    const id = parseInt(e.target.dataset.id);
                                    addToCart(id);
                                });
                            });
                        };
                    
                        const addToCart = (id) => {
                            let cart = JSON.parse(localStorage.getItem('cart')) || [];
                            const product = products.find(product => product.id === id);
                            if (product) {
                                cart = [...cart, product];
                                localStorage.setItem('cart', JSON.stringify(cart));
                                displayMessage(`${product.name} ha sido agregado al carrito.`);
                            }
                        };
                    
                        const renderCart = () => {
                            const cart = JSON.parse(localStorage.getItem('cart')) || [];
                            cartDiv.innerHTML = '';
                            let total = 0;
                            cart.forEach(({ name, price, img }) => {
                                total += price;
                                const cartItem = document.createElement('div');
                                cartItem.className = 'cart-item';
                                cartItem.innerHTML = `
                                    <img src="${img}" alt="${name}">
                                    <h2>${name}</h2>
                                    <p>$${price}</p>
                                `;
                                cartDiv.appendChild(cartItem);
                            });
                    
                            const totalDiv = document.createElement('div');
                            totalDiv.className = 'cart-item';
                            totalDiv.innerHTML = `
                                <h2>Total</h2>
                                <p>$${total}</p>
                            `;
                            cartDiv.appendChild(totalDiv);
                        };
                    
                        const displayMessage = (message) => {
                            const messageDiv = document.createElement('div');
                            messageDiv.className = 'message';
                            messageDiv.textContent = message;
                            document.body.appendChild(messageDiv);
                            setTimeout(() => {
                                messageDiv.remove();
                            }, 2000);
                        };
                    
                        viewCartButton.addEventListener('click', renderCart);
                    
                        renderProducts();
                    });
                    