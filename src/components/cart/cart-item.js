// Cart item component
class CartItem {
    constructor(item, cartService) {
        this.item = item;
        this.cartService = cartService;
    }
    
    render() {
        const element = Helpers.createElement('div', 'cart-item');
        element.innerHTML = `
            <div class="cart-item-info">
                <h4>${this.item.name}</h4>
                <div class="cart-item-details">
                    <span class="cart-item-quantity">${this.item.quantity}x</span>
                    <span class="cart-item-price">@ ${Helpers.formatPrice(this.item.price)}</span>
                    <span class="cart-item-total">${Helpers.formatPrice(this.item.price * this.item.quantity)}</span>
                </div>
            </div>
            <button class="remove-item" data-product-id="${this.item.id}">×</button>
        `;
        
        const removeBtn = element.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
            this.cartService.removeItem(this.item.id);
        });
        
        return element;
    }
}