// Product card component
class ProductCard {
    constructor(product, cartService) {
        this.product = product;
        this.cartService = cartService;
        this.element = null;
    }
    
    render() {
        this.element = Helpers.createElement('div', 'product-card');
        this.element.innerHTML = `
            <img src="${this.product.image}" alt="${this.product.name}" class="product-image">
            <button class="add-to-cart-btn" data-product-id="${this.product.id}">
                <svg width="21" height="20" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#C73B0F" fill-rule="nonzero">
                        <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"/>
                    </g>
                </svg>
                Add to Cart
            </button>
            <div class="quantity-controls" id="quantity-${this.product.id}">
                <button class="quantity-btn decrease" data-product-id="${this.product.id}">-</button>
                <span class="quantity-display">1</span>
                <button class="quantity-btn increase" data-product-id="${this.product.id}">+</button>
            </div>
            <div class="product-info">
                <h3>${this.product.category}</h3>
                <h2>${this.product.name}</h2>
                <p class="price">${Helpers.formatPrice(this.product.price)}</p>
            </div>
        `;
        
        this.attachEventListeners();
        return this.element;
    }
    
    attachEventListeners() {
        const addBtn = this.element.querySelector('.add-to-cart-btn');
        const decreaseBtn = this.element.querySelector('.quantity-btn.decrease');
        const increaseBtn = this.element.querySelector('.quantity-btn.increase');
        
        addBtn.addEventListener('click', () => {
            this.cartService.addItem(this.product.id);
        });
        
        decreaseBtn.addEventListener('click', () => {
            const cartItem = this.cartService.getItem(this.product.id);
            if (cartItem) {
                this.cartService.updateQuantity(this.product.id, cartItem.quantity - 1);
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const cartItem = this.cartService.getItem(this.product.id);
            if (cartItem) {
                this.cartService.updateQuantity(this.product.id, cartItem.quantity + 1);
            }
        });
    }
    
    updateDisplay(cartItems) {
        const addBtn = this.element.querySelector('.add-to-cart-btn');
        const quantityControls = this.element.querySelector('.quantity-controls');
        const quantityDisplay = this.element.querySelector('.quantity-display');
        
        const cartItem = cartItems.find(item => item.id === this.product.id);
        
        if (cartItem) {
            addBtn.style.display = 'none';
            quantityControls.style.display = 'flex';
            quantityDisplay.textContent = cartItem.quantity;
        } else {
            addBtn.style.display = 'flex';
            quantityControls.style.display = 'none';
        }
    }
}