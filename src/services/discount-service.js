// Discount service
class DiscountService {
    constructor() {
        this.appliedDiscount = null;
        this.observers = [];
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    notifyObservers() {
        this.observers.forEach(observer => observer.updateDiscount(this.appliedDiscount));
    }
    
    applyDiscount(code) {
        const upperCode = code.trim().toUpperCase();
        const discount = APP_CONFIG.DISCOUNT_CODES[upperCode];
        
        if (discount) {
            this.appliedDiscount = discount;
            this.notifyObservers();
            return { success: true, message: `Discount applied: ${discount.description}` };
        } else {
            this.appliedDiscount = null;
            this.notifyObservers();
            return { success: false, message: 'Invalid discount code' };
        }
    }
    
    calculateDiscount(subtotal) {
        if (!this.appliedDiscount) return 0;
        
        if (this.appliedDiscount.type === 'percentage') {
            return subtotal * (this.appliedDiscount.value / 100);
        } else {
            return this.appliedDiscount.value;
        }
    }
    
    getAppliedDiscount() {
        return this.appliedDiscount;
    }
    
    clearDiscount() {
        this.appliedDiscount = null;
        this.notifyObservers();
    }
}