document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

function initPage() {
    updateAuthUI();
    setupEventListeners();
    loadPageContent();
    setupModal();
}

function setupEventListeners() {
    document.getElementById('logout-link')?.addEventListener('click', handleLogout);
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
    addProductClickHandlers();
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

// Modal functionality
let currentProductId = null;

function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Handle modal add to cart button
    document.getElementById('modalAddToCart')?.addEventListener('click', () => {
        if (currentProductId) {
            const product = products.find(p => p.id === currentProductId);
            if (product) {
                addProductToCart(product);
                modal.classList.remove('show');
            }
        }
    });
}

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProductId = productId;
    const modal = document.getElementById('productModal');
    
    // Set modal content
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
    
    // Clear existing specs
    const specsList = document.getElementById('modalProductSpecs');
    specsList.innerHTML = '';
    
    // Add specs if they exist
    if (product.specs) {
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
    }
    
    modal.classList.add('show');
}

function addProductClickHandlers() {
    document.querySelectorAll('.product-image').forEach(img => {
        img.addEventListener('click', function() {
            const productId = parseInt(this.closest('.product-card').querySelector('.add-to-cart').getAttribute('data-id'));
            showProductModal(productId);
        });
    });
}

document.getElementById('checkout-btn').addEventListener('submit', function(e) {
    e.preventDefault();
    // alert('Shipping information saved! Redirecting to payment...');
    window.location.href = 'checkout.html';

})