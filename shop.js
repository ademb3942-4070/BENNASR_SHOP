document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product button');
    const cartCountElement = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');
    const cartLink = document.getElementById('cart-link');
    const overlay = document.getElementById('overlay');

    let cart = [];

    // Open Cart
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    // Close Cart
    function closeCart() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // Add to Cart Logic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product');
            const productInfo = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src
            };

            addToCart(productInfo);

            // Visual feedback
            const originalText = button.textContent;
            button.textContent = "Added!♥";
            button.disabled = true;
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    });

    function addToCart(product) {
        cart.push(product);
        updateCartUI();
        // Auto open cart on add
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function updateCartUI() {
        // Update Count
        cartCountElement.textContent = cart.length;
        cartCountElement.style.display = 'inline-block';

        // Update Items List
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const priceValue = parseFloat(item.price.replace('TND', ''));
                total += priceValue;

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span class="item-price">${item.price}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        // Update Total
        cartTotalElement.textContent = total.toFixed(2) + 'TND';
    }
});
