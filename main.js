// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Load products
    loadProducts();
    
    // Set up event listeners
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('logout-link').addEventListener('click', logout);
    
    // Update cart count
    updateCartCount();
});

// Product data
const products = [
  {
    id: 1,
    name: "Mystique Smartwatch X1",
    description: "Track fitness, heart rate, and stay connected on the go.",
    price: 199.99,
    category: "Smartwatch",
    image: "images/smartwatch-8300238_1280.jpg"
  },
  {
    id: 2,
    name: "Mystique Buds Pro",
    description: "Wireless earphones with noise cancellation and deep bass.",
    price: 79.99,
    category: "Earphones",
    image: "images/airpods-7976095_1280.jpg"
  },
  {
    id: 3,
    name: "Mystique Phone Z5",
    description: "Powerful Android smartphone with 64MP camera.",
    price: 399.99,
    category: "Phone",
    image: "images/smartphone-7063771_1280.jpg"
  },
  {
    id: 4,
    name: "Mystique FitBand 2",
    description: "Slim fitness tracker with sleep and step tracking.",
    price: 49.99,
    category: "Smartwatch",
    image: "images/smartwatch-6500150_1280.jpg"
  },
  {
    id: 5,
    name: "Mystique EarMax",
    description: "Over-ear headphones with premium sound and comfort.",
    price: 129.99,
    category: "Earphones",
    image: "images/airpods-7226558_1280.jpg"
  },
  {
    id: 6,
    name: "Mystique UltraTab",
    description: "10.5-inch tablet perfect for work and play.",
    price: 299.99,
    category: "Tablet",
    image: "images/tablet-462950_1280.png"
  },
  {
    id: 7,
    name: "Mystique Phone M10",
    description: "Mid-range phone with 5000mAh battery and dual SIM.",
    price: 249.99,
    category: "Phone",
    image: "images/apple-1867762_1280.jpg"
  },
  {
    id: 8,
    name: "Mystique Smartwatch Kids",
    description: "Safe and fun smartwatch for kids with GPS tracking.",
    price: 59.99,
    category: "Smartwatch",
    image: "images/smartphone-7063771_1280.jpg"
  },
  {
    id: 9,
    name: "Mystique Pods Lite",
    description: "Budget-friendly wireless earbuds with clear sound.",
    price: 39.99,
    category: "Earphones",
    image: "images/headphones-5282687_1280.jpg"
  },
  {
    id: 10,
    name: "Mystique ZoomCam",
    description: "HD webcam perfect for video calls and streaming.",
    price: 59.99,
    category: "Accessory",
    image: "images/camera-541213_1280.jpg"
  },
  {
    id: 11,
    name: "Mystique Watch Luxe",
    description: "Premium smartwatch with leather strap and AMOLED display.",
    price: 229.99,
    category: "Smartwatch",
    image: "images/smartwatch-8300238_1280.jpg"
  },
  {
    id: 12,
    name: "Mystique Phone ZL Max",
    description: "Flagship phone with 8GB RAM and fast charging.",
    price: 499.99,
    category: "Phone",
    image: "images/samsung-4721542_1280.jpg"
  },
  {
    id: 13,
    name: "Mystique Tab Mini",
    description: "Compact 8-inch tablet for reading and streaming.",
    price: 179.99,
    category: "Tablet",
    image: "images/laptop-1846277_1280.jpg"
  },
  {
    id: 14,
    name: "Mystique BassBoom",
    description: "Portable Bluetooth speaker with deep bass and long battery.",
    price: 69.99,
    category: "Accessory",
    image: "images/audio-7276511_1280.jpg"
  },
  {
    id: 15,
    name: "Mystique EarShield",
    description: "Noise-isolating wired earphones for budget-conscious users.",
    price: 19.99,
    category: "Earphones",
    image: "images/headphones-5282687_1280.jpg"
  }
];


// Check if user is logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
    }
}

// Load products into the page
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
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

// Filter products by category
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
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

// Add product to cart
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

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-link').forEach(link => {
        link.textContent = `Cart (${totalItems})`;
    });
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}