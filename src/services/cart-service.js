// Cart service
class CartService {
    constructor() {
        this.cart = [];
        this.observers = [];
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.cart));
    }
    
    addItem(productId) {
        const product = ProductService.getProductById(productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.notifyObservers();
    }
    
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.notifyObservers();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.notifyObservers();
            }
        }
    }
    
    getItem(productId) {
        return this.cart.find(item => item.id === productId);
    }
    
    getItems() {
        return [...this.cart];
    }
    
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    getSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    clear() {
        this.cart = [];
        this.notifyObservers();
    }
}