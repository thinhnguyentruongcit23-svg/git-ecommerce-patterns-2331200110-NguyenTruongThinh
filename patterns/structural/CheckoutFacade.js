import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
    const { userId, productIds, amount, shippingInfo } = orderDetails;

    console.log('[Checkout] Starting checkout process...');

    // Step 1: Check stock
    const stockAvailable = this.inventoryService.checkStock(productIds);

    if (!stockAvailable) {
        console.log('[Checkout] Order failed: Products are out of stock.');
        return false;
    }

    // Step 2: Process payment
    const paymentSuccessful = this.paymentService.processPayment(userId, amount);

    if (!paymentSuccessful) {
        console.log('[Checkout] Order failed: Payment was unsuccessful.');
        return false;
    }

    // Step 3: Arrange shipping
    const shipment = this.shippingService.arrangeShipping(userId, shippingInfo);

    if (!shipment || !shipment.trackingId) {
        console.log('[Checkout] Order failed: Shipping could not be arranged.');
        return false;
    }

    console.log('[Checkout] Order completed successfully.');
    console.log(`[Checkout] Tracking ID: ${shipment.trackingId}`);

    return shipment;
}
}

export { CheckoutFacade };
