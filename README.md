# konecta_task1
Key Features:
Responsive Design - Works on desktop and mobile
Interactive Cart - Real-time updates with quantity controls
User Management - Save users to localStorage and reload them
Discount System - Percentage and fixed amount discounts
Order Confirmation - Modal with order summary
Print Receipt - Professional receipt format
Carbon Neutral Badge - Environmental messaging
Discount Codes Available:
SAVE10 - 10% off
SAVE5 - $5 off
WELCOME - 15% off
The application follows the Frontend Mentor design patterns while adding the requested functionality. All data persists in localStorage for users, and the cart state is managed in memory for the session.

🏗️ Architecture Patterns Implemented:
Component-Based Architecture: Each UI element is a separate, reusable component
Observer Pattern: Services notify components of state changes
Service Layer: Business logic separated from UI components
CSS Architecture: Organized with base, layout, and component styles
Dependency Injection: Services are injected into components
🔧 Key Features:
Modular Components: Each component handles its own rendering and events
State Management: Centralized in services with observer notifications
CSS Variables: Consistent design system with custom properties
Separation of Concerns: Clear boundaries between UI, business logic, and data
Scalable Structure: Easy to add new components and features


    Folder structure
src/
├── components/
│   ├── cart/
│   │   ├── cart.js
│   │   ├── cart-item.js
│   │   └── cart-total.js
│   ├── product/
│   │   ├── product-card.js
│   │   └── product-grid.js
│   ├── modal/
│   │   └── order-modal.js
│   └── user/
│       └── user-manager.js
├── services/
│   ├── cart-service.js
│   ├── discount-service.js
│   ├── product-service.js
│   ├── storage-service.js
│   └── print-service.js
├── utils/
│   ├── constants.js
│   └── helpers.js
└── styles/
    ├── base/
    │   ├── reset.css
    │   ├── variables.css
    │   └── typography.css
    ├── components/
    │   ├── product.css
    │   ├── cart.css
    │   ├── modal.css
    │   └── buttons.css
    ├── layout/
    │   ├── grid.css
    │   └── responsive.css
    └── main.css