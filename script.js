// Sample product data
const products = [
    {
        id: 1,
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
        image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00,
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop"
    },
    {
        id: 9,
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop"
    }
];

// Discount codes
const discountCodes = {
    'SAVE10': { type: 'percentage', value: 10, description: '10% off' },
    'SAVE5': { type: 'fixed', value: 5, description: '$5 off' },
    'WELCOME': { type: 'percentage', value: 15, description: '15% off for new customers' }
};

// Application state
let cart = [];
let currentUser = '';
let appliedDiscount = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    loadSavedUsers();
    setupEventListeners();
    updateCartDisplay();
});

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <svg width="21" height="20" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#C73B0F" fill-rule="nonzero">
                        <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"/>
                    </g>
                </svg>
                Add to Cart
            </button>
            <div class="quantity-controls" id="quantity-${product.id}">
                <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                <span id="quantity-display-${product.id}">1</span>
                <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
            </div>
            <div class="product-info">
                <h3>${product.category}</h3>
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('save-user').addEventListener('click', saveUser);
    document.getElementById('saved-users').addEventListener('change', loadUser);
    document.getElementById('apply-discount').addEventListener('click', applyDiscount);
    document.getElementById('confirm-order').addEventListener('click', confirmOrder);
    document.getElementById('print-receipt').addEventListener('click', printReceipt);
    document.getElementById('start-new-order').addEventListener('click', startNewOrder);
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateProductDisplay(productId);
    updateCartDisplay();
}

function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        updateProductDisplay(productId);
        updateCartDisplay();
    }
}

function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateProductDisplay(productId);
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateProductDisplay(productId);
    updateCartDisplay();
}

function updateProductDisplay(productId) {
    const addBtn = document.querySelector(`[onclick="addToCart(${productId})"]`);
    const quantityControls = document.getElementById(`quantity-${productId}`);
    const quantityDisplay = document.getElementById(`quantity-display-${productId}`);
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        addBtn.style.display = 'none';
        quantityControls.style.display = 'flex';
        quantityDisplay.textContent = cartItem.quantity;
    } else {
        addBtn.style.display = 'flex';
        quantityControls.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartTotal.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartTotal.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-details">
                        <span class="cart-item-quantity">${item.quantity}x</span>
                        <span class="cart-item-price">@ $${item.price.toFixed(2)}</span>
                        <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        updateTotals();
    }
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;
    
    if (appliedDiscount) {
        if (appliedDiscount.type === 'percentage') {
            discountAmount = subtotal * (appliedDiscount.value / 100);
        } else {
            discountAmount = appliedDiscount.value;
        }
    }
    
    const finalTotal = subtotal - discountAmount;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount-amount').textContent = `-$${discountAmount.toFixed(2)}`;
    document.getElementById('final-total').textContent = `$${finalTotal.toFixed(2)}`;
    
    const discountRow = document.getElementById('discount-row');
    discountRow.style.display = appliedDiscount ? 'flex' : 'none';
}

// User management
function saveUser() {
    const userName = document.getElementById('user-name').value.trim();
    if (!userName) return;
    
    let savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    if (!savedUsers.includes(userName)) {
        savedUsers.push(userName);
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
        loadSavedUsers();
    }
    
    currentUser = userName;
    document.getElementById('user-name').value = '';
}

function loadSavedUsers() {
    const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    const select = document.getElementById('saved-users');
    
    select.innerHTML = '<option value="">Select saved user</option>';
    savedUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        select.appendChild(option);
    });
}

function loadUser() {
    const selectedUser = document.getElementById('saved-users').value;
    currentUser = selectedUser;
    document.getElementById('user-name').value = selectedUser;
}

// Discount management
function applyDiscount() {
    const code = document.getElementById('discount-code').value.trim().toUpperCase();
    const discountInfo = document.getElementById('discount-info');
    
    if (discountCodes[code]) {
        appliedDiscount = discountCodes[code];
        discountInfo.textContent = `Discount applied: ${appliedDiscount.description}`;
        discountInfo.style.color = '#1ea575';
        updateTotals();
    } else {
        discountInfo.textContent = 'Invalid discount code';
        discountInfo.style.color = '#c73b0f';
        appliedDiscount = null;
        updateTotals();
    }
}

// Order management
function confirmOrder() {
    if (cart.length === 0) return;
    
    const modal = document.getElementById('order-modal');
    const modalItems = document.getElementById('modal-order-items');
    const modalTotal = document.getElementById('modal-total');
    
    modalItems.innerHTML = cart.map(item => `
        <div class="modal-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="modal-item-info">
                <h4>${item.name}</h4>
                <div class="modal-item-details">
                    <span>${item.quantity}x</span>
                    <span>@ $${item.price.toFixed(2)}</span>
                </div>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const finalTotal = document.getElementById('final-total').textContent;
    modalTotal.textContent = finalTotal;
    
    modal.style.display = 'block';
}

function startNewOrder() {
    cart = [];
    appliedDiscount = null;
    document.getElementById('discount-code').value = '';
    document.getElementById('discount-info').textContent = '';
    document.getElementById('order-modal').style.display = 'none';
    
    // Reset all product displays
    products.forEach(product => {
        updateProductDisplay(product.id);
    });
    
    updateCartDisplay();
}

function printReceipt() {
    if (cart.length === 0) return;
    
    const receiptWindow = window.open('', '_blank');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;
    
    if (appliedDiscount) {
        if (appliedDiscount.type === 'percentage') {
            discountAmount = subtotal * (appliedDiscount.value / 100);
        } else {
            discountAmount = appliedDiscount.value;
        }
    }
    
    const finalTotal = subtotal - discountAmount;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    receiptWindow.document.write(`
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                .item { display: flex; justify-content: space-between; margin-bottom: 10px; }
                .total-section { border-top: 2px solid #000; padding-top: 10px; margin-top: 20px; }
                .total { font-weight: bold; font-size: 1.2em; }
                .footer { text-align: center; margin-top: 20px; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>DESSERT SHOP</h1>
                <p>Receipt</p>
                <p>${date} ${time}</p>
                ${currentUser ? `<p>Customer: ${currentUser}</p>` : ''}
            </div>
            
            <div class="items">
                ${cart.map(item => `
                    <div class="item">
                        <span>${item.name}</span>
                        <span>${item.quantity}x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="total-section">
                <div class="item">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                ${appliedDiscount ? `
                    <div class="item">
                        <span>Discount (${appliedDiscount.description}):</span>
                        <span>-$${discountAmount.toFixed(2)}</span>
                    </div>
                ` : ''}
                <div class="item total">
                    <span>TOTAL:</span>
                    <span>$${finalTotal.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="footer">
                <p>Thank you for your order!</p>
                <p>This is a carbon-neutral delivery</p>
            </div>
        </body>
        </html>
    `);
    
    receiptWindow.document.close();
    receiptWindow.print();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}