document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cart-items')) {
        loadCartItems();
    }
    
    updateCartCount();
});

// Load cart items into the page
function loadCartItems() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('checkout-btn').disabled = true;
        updateCartSummary(cart);
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">Remove</div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeItem);
    });
    
    updateCartSummary(cart);
    document.getElementById('checkout-btn').disabled = false;
}

// Update cart summary
function updateCartSummary(cart) {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Decrease item quantity
function decreaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    let cart = getCart();
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        saveCart(cart);
        loadCartItems();
        updateCartCount();
    }
}

// Increase item quantity
function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    let cart = getCart();
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
        saveCart(cart);
        loadCartItems();
        updateCartCount();
    }
}

// Remove item from cart
function removeItem(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    let cart = getCart();
    
    cart = cart.filter(item => item.id !== productId);
    
    saveCart(cart);
    loadCartItems();
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-link').forEach(link => {
        link.textContent = totalItems > 0 ? `Cart (${totalItems})` : 'Cart';
    });
}

// Get current user's cart
function getCart() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const cartKey = `cart_${currentUser.id}`;
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// Save current user's cart
function saveCart(cart) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const cartKey = `cart_${currentUser.id}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
}