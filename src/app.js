// Main application entry point
class App {
    constructor() {
        this.cartService = new CartService();
        this.discountService = new DiscountService();
        this.userManager = new UserManager();
        this.productGrid = null;
        this.cart = null;
        this.orderModal = null;
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }
    
    initializeComponents() {
        // Initialize product grid
        this.productGrid = new ProductGrid('products-grid', this.cartService);
        this.productGrid.render();
        
        // Initialize cart
        this.cart = new Cart('cart-container', this.cartService, this.discountService);
        
        // Initialize order modal
        this.orderModal = new OrderModal('order-modal', this.cartService, this.discountService);
        
        // Make components globally accessible for cross-component communication
        window.app = this;
    }
}

// Initialize the application
new App();