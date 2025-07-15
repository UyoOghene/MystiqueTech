const productList = document.getElementById('product-list');


products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <strong>$${product.price.toFixed(2)}</strong><br/>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;

  productList.appendChild(card);
});


function addToCart(productId) {
  alert(`Product ${productId} added to cart`);

  
}
