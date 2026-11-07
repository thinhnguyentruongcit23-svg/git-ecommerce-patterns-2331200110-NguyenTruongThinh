// --- SINGLETON PATTERN ---
let instance = null;

class CartService {
    constructor() {
        // Check if an instance already exists
        if (instance) {
            return instance;
        }

        // Initialize class properties
        this.products = [];

        // Store the single instance
        instance = this;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
    }

    getProducts() {
        return this.products;
    }
}

export { CartService };