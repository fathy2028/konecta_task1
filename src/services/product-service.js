// Product service
class ProductService {
    static getAllProducts() {
        return APP_CONFIG.PRODUCTS;
    }
    
    static getProductById(id) {
        return APP_CONFIG.PRODUCTS.find(product => product.id === id);
    }
    
    static searchProducts(query) {
        const lowercaseQuery = query.toLowerCase();
        return APP_CONFIG.PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery)
        );
    }
}