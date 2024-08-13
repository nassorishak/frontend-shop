import { faChartBar, faShoppingCart, faMoneyBill, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const links = {
    VENDOR: [
        { label: 'Dashboard', path: '/vendor-dashboard', icon: faChartBar },
        { label: 'Add Product', path: '/addProduct', icon: faShoppingCart },
        { label: 'View Product', path: '/vewProduct', icon: faShoppingCart },
        { label: 'Manage Order', path: '/manage-Order', icon: faChartBar },
        { label: 'Payment Record', path: '/payment-Record', icon: faMoneyBill },
        { label: 'Change Information', path: '/change-information', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }

    ],
    CUSTOMER: [
        
        { label: 'Dashboard', path: '/customer-dashboard', icon: faChartBar },
        { label: 'View Product', path: '/view-product', icon: faShoppingCart },
        { label: 'View Order', path: '/vewOrder', icon: faChartBar },
        { label: 'Make-Payment', path: '/make-payment', icon: faMoneyBill },
        { label: 'Control-number', path: '/control-number', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ],
    ADMIN: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: faChartBar },
        { label: 'Manage Orders', path: '/manage-orders', icon: faChartBar },
        { label: 'Manage Customers', path: '/amanage-customers', icon: faCog },
        { label: 'AManage products', path: '/a-manage-products', icon: faShoppingCart },
        { label: 'RegisterVendor', path: '/register-vendor', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ]
};

export default links;