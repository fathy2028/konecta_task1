// Utility helper functions
const Helpers = {
    formatPrice: (price) => `$${price.toFixed(2)}`,
    
    formatDate: () => new Date().toLocaleDateString(),
    
    formatTime: () => new Date().toLocaleTimeString(),
    
    createElement: (tag, className, innerHTML) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};