// Order modal component
class OrderModal {
    constructor(modalId, cartService, discountService) {
        this.modal = document.getElementById(modalId);
        this.cartService = cartService;
        this.discountService = discountService;
        this.init();
    }
    
    init() {
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hide();
            }
        });
        
        // Handle start new order button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-new-order') {
                this.startNewOrder();
            }
        });
    }
    
    show() {
        const cartItems = this.cartService.getItems();
        if (cartItems.length === 0) return;
        
        this.render(cartItems);
        this.modal.style.display = 'block';
    }
    
    hide() {
        this.modal.style.display = 'none';
    }
    
    render(cartItems) {
        const subtotal = this.cartService.getSubtotal();
        const discountAmount = this.discountService.calculateDiscount(subtotal);
        const finalTotal = subtotal - discountAmount;
        
        this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 48 48'%3E%3Cpath fill='%231EA575' d='M21 32.121 13.5 24.6l2.121-2.121L21 27.879l11.379-11.379 2.121 2.121L21 32.121Z'/%3E%3C/svg%3E" alt="Order confirmed">
                    <h2>Order Confirmed</h2>
                    <p>We hope you enjoy your food!</p>
                </div>
                <div class="modal-body">
                    ${cartItems.map(item => `
                        <div class="modal-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="modal-item-info">
                                <h4>${item.name}</h4>
                                <div class="modal-item-details">
                                    <span>${item.quantity}x</span>
                                    <span>@ ${Helpers.formatPrice(item.price)}</span>
                                </div>
                            </div>
                            <span>${Helpers.formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-total">
                    <span>Order Total: <strong>${Helpers.formatPrice(finalTotal)}</strong></span>
                </div>
                <button id="start-new-order" class="start-new-order-btn">Start New Order</button>
            </div>
        `;
    }
    
    startNewOrder() {
        this.cartService.clear();
        this.discountService.clearDiscount();
        
        // Clear form inputs
        const discountCodeInput = document.getElementById('discount-code');
        const discountInfo = document.getElementById('discount-info');
        
        if (discountCodeInput) discountCodeInput.value = '';
        if (discountInfo) discountInfo.textContent = '';
        
        this.hide();
    }
}