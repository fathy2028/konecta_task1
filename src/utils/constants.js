// Application constants
const APP_CONFIG = {
    STORAGE_KEYS: {
        SAVED_USERS: 'savedUsers'
    },
    DISCOUNT_CODES: {
        'SAVE10': { type: 'percentage', value: 10, description: '10% off' },
        'SAVE5': { type: 'fixed', value: 5, description: '$5 off' },
        'WELCOME': { type: 'percentage', value: 15, description: '15% off for new customers' }
    },
    PRODUCTS: [
        {
            id: 1,
            name: "Waffle with Berries",
            category: "Waffle",
            price: 6.50,
            image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=200&fit=crop"
        },
        {
            id: 2,
            name: "Vanilla Bean Crème Brûlée",
            category: "Crème Brûlée",
            price: 7.00,
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop"
        },
        {
            id: 3,
            name: "Macaron Mix of Five",
            category: "Macaron",
            price: 8.00,
            image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=200&fit=crop"
        },
        {
            id: 4,
            name: "Classic Tiramisu",
            category: "Tiramisu",
            price: 5.50,
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop"
        },
        {
            id: 5,
            name: "Pistachio Baklava",
            category: "Baklava",
            price: 4.00,
            image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=300&h=200&fit=crop"
        },
        {
            id: 6,
            name: "Lemon Meringue Pie",
            category: "Pie",
            price: 5.00,
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop"
        },
        {
            id: 7,
            name: "Red Velvet Cake",
            category: "Cake",
            price: 4.50,
            image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=300&h=200&fit=crop"
        },
        {
            id: 8,
            name: "Salted Caramel Brownie",
            category: "Brownie",
            price: 5.50,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop"
        },
        {
            id: 9,
            name: "Vanilla Panna Cotta",
            category: "Panna Cotta",
            price: 6.50,
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop"
        }
    ]
};