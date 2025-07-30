// Print service
class PrintService {
    static generateReceipt(cartItems, subtotal, discountAmount, finalTotal, customerName, appliedDiscount) {
        const date = Helpers.formatDate();
        const time = Helpers.formatTime();
        
        return `
            <html>
            <head>
                <title>Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                    .item { display: flex; justify-content: space-between; margin-bottom: 10px; }
                    .total-section { border-top: 2px solid #000; padding-top: 10px; margin-top: 20px; }
                    .total { font-weight: bold; font-size: 1.2em; }
                    .footer { text-align: center; margin-top: 20px; font-size: 0.9em; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>DESSERT SHOP</h1>
                    <p>Receipt</p>
                    <p>${date} ${time}</p>
                    ${customerName ? `<p>Customer: ${customerName}</p>` : ''}
                </div>
                
                <div class="items">
                    ${cartItems.map(item => `
                        <div class="item">
                            <span>${item.name}</span>
                            <span>${item.quantity}x ${Helpers.formatPrice(item.price)} = ${Helpers.formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="total-section">
                    <div class="item">
                        <span>Subtotal:</span>
                        <span>${Helpers.formatPrice(subtotal)}</span>
                    </div>
                    ${appliedDiscount ? `
                        <div class="item">
                            <span>Discount (${appliedDiscount.description}):</span>
                            <span>-${Helpers.formatPrice(discountAmount)}</span>
                        </div>
                    ` : ''}
                    <div class="item total">
                        <span>TOTAL:</span>
                        <span>${Helpers.formatPrice(finalTotal)}</span>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Thank you for your order!</p>
                    <p>This is a carbon-neutral delivery</p>
                </div>
            </body>
            </html>
        `;
    }
    
    static printReceipt(receiptHTML) {
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(receiptHTML);
        receiptWindow.document.close();
        receiptWindow.print();
    }
}