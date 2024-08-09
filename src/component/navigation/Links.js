
import { faChartBar, faShoppingCart, faMoneyBill, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const links = {
    VENDOR: [
        { label: 'Dashboard', path: '/vendor-dashboard', icon: faChartBar },
        { label: 'Add Product', path: '/addProduct', icon: faShoppingCart },
        { label: 'View Product', path: '/vewProduct', icon: faShoppingCart },
        { label: 'Manage Order', path: '/manage-Order', icon: faCog },
        { label: 'Payment Record', path: '/payment-Record', icon: faMoneyBill },
        { label: 'Change Information', path: '/change-information', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ],
    CUSTOMER: [
        { label: 'Dashboard', path: '/customer-dashboard', icon: faChartBar },
        { label: 'View Product', path: '/view-product', icon: faShoppingCart },
        { label: 'View Order', path: '/vewOrder', icon: faShoppingCart },
        { label: 'Make Payment', path: '/cust-make-payment', icon: faMoneyBill },
        { label: 'Change Information', path: '/custchange-information', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ],
    ADMIN: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: faChartBar },
        { label: 'Manage Orders', path: '/manage-orders', icon: faCog },
        { label: 'Manage Customers', path: '/manage-customers', icon: faCog },
        { label: 'View Order', path: '/aviewOrder', icon: faShoppingCart },
        { label: 'Change Information', path: '/achange-information', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ]
};

export default links;
