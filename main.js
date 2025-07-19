document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

function initPage() {
    updateAuthUI();
    
    setupEventListeners();
    
    loadPageContent();
}

function setupEventListeners() {
    document.getElementById('logout-link')?.addEventListener('click', handleLogout);
    
    document.getElementById('category-filter')?.addEventListener('change', filterProducts);
    
    // Mobile menu toggle
    document.getElementById('hamburger')?.addEventListener('click', toggleMobileMenu);
}

function loadPageContent() {
    if (document.getElementById('products-container')) {
        loadProducts();
    }
    
    updateCartCount();
    
    checkLoginStatus();
}

// Authentication Functions
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userGreeting = document.getElementById('user-greeting');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    if (currentUser) {
        // User is logged in
        if (userGreeting) userGreeting.textContent = `Hello, ${currentUser.name}`;
        if (logoutLink) logoutLink.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
    } else {
        // User is logged out
        if (userGreeting) userGreeting.textContent = '';
        if (logoutLink) logoutLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (signupLink) signupLink.style.display = 'block';
    }
}

function checkLoginStatus() {
    // Only protect specific pages (like cart.html)
    if (window.location.pathname.includes('cart.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'login.html';
        }
    }
}

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = 'index.html';
}

// Product Functions
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


// Cart Functions
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-link').forEach(link => {
        link.textContent = totalItems > 0 ? `Cart (${totalItems})` : 'Cart';
    });
}

// Utility Functions
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}