import { faChartBar, faShoppingCart, faMoneyBill, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const links = {
    VENDOR: [
        { label: 'Dashboard', path: '/vendor-dashboard', icon: faChartBar },
        { label: 'View Product', path: '/viewProduct', icon: faShoppingCart },
        { label: 'Manage Order', path: '/manage-Order', icon: faChartBar },
        { label: 'Payment Record', path: '/payment-Record', icon: faMoneyBill }, 
         { label: 'Stock', path: '/stock', icon: faMoneyBill },   
        { label: 'Sales', path: '/sale', icon: faCog },       
        { label: 'Logout', path: '/', icon: faSignOutAlt  }

    ],
    CUSTOMER: [
        
        { label: 'Dashboard', path: '/customer-dashboard', icon: faChartBar },
        { label: 'View Product', path: '/view-product', icon: faShoppingCart },
        { label: 'View Order', path: '/viewOrder', icon: faChartBar },
        // { label: 'Make-Payment', path: '/make-payment', icon: faMoneyBill },
        // { label: 'Control-number', path: '/control-number', icon: faCog },
        { label: 'Paymenet-record', path: '/cust-paymenet-record',icon: faMoneyBill  },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
      
    ],
    ADMIN: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: faChartBar },
        { label: 'Manage Orders', path: '/manage-orders', icon: faChartBar },
        { label: 'AddPurchase', path: '/add-puchase', icon: faMoneyBill },
         { label: 'Add Product', path: '/addProduct', icon: faShoppingCart },
        { label: 'Purchase', path: '/purchase', icon: faMoneyBill },
        { label: 'Manage Customers', path: '/amanage-customers', icon: faCog },
        // { label: 'AddShelf', path: '/add-shelf', icon: faShoppingCart },  
        { label: 'Shelf', path: '/shelf', icon: faShoppingCart },          
        { label: 'Manage Vendors', path: '/manage-vendors', icon: faCog },
        // { label: 'Vendor-blocker', path: '/vendor-blocker', icon: faCog },
        { label: 'Logout', path: '/', icon: faSignOutAlt }
    ]
};

export default links;