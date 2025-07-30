// Main cart component
class Cart {
    constructor(containerId, cartService, discountService) {
        this.container = document.getElementById(containerId);
        this.cartService = cartService;
        this.discountService = discountService;
        this.cartTotal = new CartTotal(cartService, discountService);
        
        // Subscribe to cart and discount updates
        this.cartService.addObserver(this);
        this.discountService.addObserver(this);
        
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <h2>Your Cart (<span id="cart-count">0</span>)</h2>
            
            <div class="user-section">
                <input type="text" id="user-name" placeholder="Enter your name (optional)">
                <button id="save-user" class="btn btn-secondary btn-full">Save User</button>
                <select id="saved-users">
                    <option value="">Select saved user</option>
                </select>
            </div>
            
            <div class="discount-section">
                <input type="text" id="discount-code" placeholder="Discount code">
                <button id="apply-discount" class="btn btn-primary">Apply</button>
                <div id="discount-info"></div>
            </div>
            
            <div id="empty-cart" class="empty-cart">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 128 128'%3E%3Cpath fill='%23260F08' d='M8.436 110.406c0 1.061 4.636 2.079 9.849 2.079 5.213 0 9.849-1.018 9.849-2.079v-2.913c0 1.061-4.636 2.079-9.849 2.079-5.213 0-9.849-1.018-9.849-2.079v2.913Z'/%3E%3C/svg%3E" alt="Empty cart">
                <p>Your added items will appear here</p>
            </div>
            
            <div id="cart-items" class="cart-items"></div>
            <div id="cart-total-container"></div>
        `;
        
        this.attachEventListeners();
        this.updateDisplay([]);
    }
    
    attachEventListeners() {
        const applyDiscountBtn = this.container.querySelector('#apply-discount');
        applyDiscountBtn.addEventListener('click', () => {
            const code = this.container.querySelector('#discount-code').value;
            const result = this.discountService.applyDiscount(code);
            this.showDiscountMessage(result.message, result.success);
        });
    }
    
    update(cartItems) {
        this.updateDisplay(cartItems);
    }
    
    updateDiscount() {
        if (this.cartTotal) {
            this.cartTotal.updateDisplay();
        }
    }
    
    updateDisplay(cartItems) {
        const cartCount = this.container.querySelector('#cart-count');
        const emptyCart = this.container.querySelector('#empty-cart');
        const cartItemsContainer = this.container.querySelector('#cart-items');
        const cartTotalContainer = this.container.querySelector('#cart-total-container');
        
        const totalItems = this.cartService.getTotalItems();
        cartCount.textContent = totalItems;
        
        if (cartItems.length === 0) {
            emptyCart.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            cartTotalContainer.innerHTML = '';
        } else {
            emptyCart.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            
            // Render cart items
            cartItemsContainer.innerHTML = '';
            cartItems.forEach(item => {
                const cartItem = new CartItem(item, this.cartService);
                cartItemsContainer.appendChild(cartItem.render());
            });
            
            // Render cart total
            cartTotalContainer.innerHTML = '';
            cartTotalContainer.appendChild(this.cartTotal.render());
        }
    }
    
    showDiscountMessage(message, isSuccess) {
        const discountInfo = this.container.querySelector('#discount-info');
        discountInfo.textContent = message;
        discountInfo.style.color = isSuccess ? 'var(--color-secondary)' : 'var(--color-primary)';
    }
}