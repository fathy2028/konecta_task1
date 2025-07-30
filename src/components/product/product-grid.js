// Product grid component
class ProductGrid {
    constructor(containerId, cartService) {
        this.container = document.getElementById(containerId);
        this.cartService = cartService;
        this.productCards = [];
        
        // Subscribe to cart updates
        this.cartService.addObserver(this);
    }
    
    render() {
        this.container.innerHTML = '';
        this.productCards = [];
        
        const products = ProductService.getAllProducts();
        
        products.forEach(product => {
            const productCard = new ProductCard(product, this.cartService);
            this.productCards.push(productCard);
            this.container.appendChild(productCard.render());
        });
    }
    
    update(cartItems) {
        this.productCards.forEach(card => {
            card.updateDisplay(cartItems);
        });
    }
}