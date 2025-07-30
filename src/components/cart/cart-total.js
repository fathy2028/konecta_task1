// Cart total component
class CartTotal {
    constructor(cartService, discountService) {
        this.cartService = cartService;
        this.discountService = discountService;
        this.element = null;
    }
    
    render() {
        this.element = Helpers.createElement('div', 'cart-total');
        this.updateDisplay();
        return this.element;
    }
    
    updateDisplay() {
        if (!this.element) return;
        
        const subtotal = this.cartService.getSubtotal();
        const discountAmount = this.discountService.calculateDiscount(subtotal);
        const finalTotal = subtotal - discountAmount;
        const appliedDiscount = this.discountService.getAppliedDiscount();
        
        this.element.innerHTML = `
            <div class="total-row">
                <span>Subtotal:</span>
                <span id="subtotal">${Helpers.formatPrice(subtotal)}</span>
            </div>
            <div class="total-row discount-row" style="display: ${appliedDiscount ? 'flex' : 'none'};">
                <span>Discount:</span>
                <span id="discount-amount">-${Helpers.formatPrice(discountAmount)}</span>
            </div>
            <div class="total-row final-total">
                <span>Order Total:</span>
                <span id="final-total">${Helpers.formatPrice(finalTotal)}</span>
            </div>
            <div class="carbon-neutral">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 21 20'%3E%3Cpath fill='%231EA575' d='M8 18.35c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9Zm-.75-10.65L4.5 10.45l1.25 1.25L9.5 8.95l5.25 5.25L16 12.95 9.25 6.2l-2 2.5Z'/%3E%3C/svg%3E" alt="Carbon neutral">
                <span>This is a <strong>carbon-neutral</strong> delivery</span>
            </div>
            <button id="confirm-order" class="confirm-order-btn">Confirm Order</button>
            <button id="print-receipt" class="print-receipt-btn">Print Receipt</button>
        `;
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        const confirmBtn = this.element.querySelector('#confirm-order');
        const printBtn = this.element.querySelector('#print-receipt');
        
        confirmBtn.addEventListener('click', () => {
            window.app.orderModal.show();
        });
        
        printBtn.addEventListener('click', () => {
            this.printReceipt();
        });
    }
    
    printReceipt() {
        const cartItems = this.cartService.getItems();
        const subtotal = this.cartService.getSubtotal();
        const discountAmount = this.discountService.calculateDiscount(subtotal);
        const finalTotal = subtotal - discountAmount;
        const appliedDiscount = this.discountService.getAppliedDiscount();
        const customerName = window.app.userManager.getCurrentUser();
        
        const receiptHTML = PrintService.generateReceipt(
            cartItems, subtotal, discountAmount, finalTotal, customerName, appliedDiscount
        );
        
        PrintService.printReceipt(receiptHTML);
    }
}