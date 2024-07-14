 
const links = {
    Vendor:[
        {label:'Dashboard',path:'/vendor-dashboard'},
        {label: 'AddProduct',path:'/addProduct'},
        {label: 'ViewProduct',path:'/vewProduct'},
        {label: 'Manage-Order',path: '/manage-Order'},
        {label: 'Payment-Record', path: '/payment-Record'},
        {label: 'Change-Information', path: '/vchange-information'},
        {label: 'Logout', path: '/logout'}
    ],
        Customer:[
            {label:'Dashboard',path:'/customer-dashboard'},
            {label: 'make-order',path:'/make-order'},
            {label: 'ViewOrder',path:'/vewOrder'},
            {label: 'MakePayment',path: '/cust-make-payment'},
            {label: 'CustChange-Information', path: '/custchange-information'},
            {label: 'Logout', path: '/logout'}

    ],


    Admin:[
        {label:'Dashboard',path:'/admin-dashboard'},
        {label: 'manage-order',path:'/amanage-orders'},
        {label: 'manage-customer',path:'/amanage-customers'},
        {label: 'ViewOrder',path:'/avewOrder'},
        {label: 'Change-Information', path: '/achange-information'},
        {label: 'Logout', path: '/logout'}

],


}

export default links;