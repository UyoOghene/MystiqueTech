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
    document.getElementById('hamburger')?.addEventListener('click', toggleMobileMenu);
}

function loadPageContent() {
    if (document.getElementById('products-container')) {
        loadProducts();
    }
    updateCartCount();
}

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
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    let cart = getCart();
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
    
    saveCart(cart);
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// function toggleMobileMenu() {
//     const nav = document.getElementById('nav');
//     nav.classList.toggle('active');
// }

function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('close-btn');
    
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        hamburger.style.display = 'none';
        if (closeBtn) closeBtn.style.display = 'block';
    } else {
        hamburger.style.display = 'block';
        if (closeBtn) closeBtn.style.display = 'none';
    }
}

document.getElementById('close-btn')?.addEventListener('click', function() {
    document.getElementById('nav').classList.remove('active');
    document.getElementById('hamburger').style.display = 'block';
    this.style.display = 'none';
});

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = 'index.html';
}

