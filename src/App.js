import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './component/vendor/AddProduct';
import ViewProduct from './component/vendor/ViewProduct';
import ManageOrder from './component/vendor/ManageOrder';
import PaymentRecord from './component/vendor/PaymentRecord';
import CustomerDshboard from './component/customer/CustomerDshboard';
import ViewOrder from './component/customer/ViewOrder';
import AdminDashboard from './component/Admin/AdminDashboard';
import AManageOrder from './component/Admin/AManageOrder';
import AManageCustomer from './component/Admin/AManageCustomer';
import VChangeInformation from './component/vendor/VChangeInformation';
import CustChangeInformation from './component/customer/CustChangeInformation';
import Login from './component/Login';
import Registerform from './component/Registerform';
import ViewProducts from './component/customer/ViewProducts';
import MakeOrder from './component/customer/MakeOrder';
import VendorDashboard from './component/vendor/VendorDashboard';
import AManageProducts from './component/Admin/AManageProducts';
import ControlNumber from './component/customer/ControlNumber';
import MakePayment from './component/customer/MakePayment';
import CustPaymentRecord from './component/customer/CustPaymentRecord';
import CustAdvertise from './CustAdvertise';
import ManageVendors from './component/Admin/ManageVendors';
import RegisterForm from './component/Registerform';
import AddVendors from './component/Admin/AddVendors';
import AddCustomers from './component/Admin/AManageProducts';
import VendorSubscription from './component/vendor/VendorSubscription';
import AdminManageSubscription from './component/Admin/AdminManageSubscription';
import VendorBlocker from './component/Admin/VendorBlocker';
import ProtectComponent from './component/ProtectComponent';
import ViewSubscription from './component/vendor/ViewSubscription';
import MonthlyReport from './component/MonthlReport';
import SalesList from './component/vendor/SaleList';
import AddSale from './component/vendor/AddSale';
import AddPurchase from './component/vendor/AddPurchase';
import PurchaseList from './component/vendor/Purchase';
import Purchase from './component/vendor/Purchase';
import AddStock from './component/vendor/AddStock';
import Stock from './component/vendor/Stock';






function App() {
  return (
    
    <div className="App">
      <Routes>
        {/* login */}
      <Route path='/Login' element={<Login/>} />
      <Route path='/registerform' element={<Registerform/>} />
      <Route path='/' element={<CustAdvertise/>}/>
      <Route path='/monthly-report' element = {<MonthlyReport/>}/>


      
      <Route element = {<ProtectComponent role1="VENDOR"/>}>

        {/* Vendor */}
        
           <Route path='/vendor-dashboard' element = {<VendorDashboard/>}/>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path='/viewProduct' element={<ViewProduct/>}/>
          <Route path='/manage-Order' element={<ManageOrder/>}/>
          <Route path='/payment-Record' element = {<PaymentRecord/>}/>
          <Route path='/vchange-information' element = {<VChangeInformation/>}/>
          <Route path='/vendor-subscription' element = {<VendorSubscription/>}/>
          <Route path='/view-subscription' element = {<ViewSubscription/>}/>
          <Route path='/sale' element = {<SalesList/>}/>
          <Route path='/add-stock' element = {<AddStock/>}/>
          <Route path='/stock' element = {<Stock/>}/>
           <Route path='/purchase' element = {<Purchase/>}/>
          <Route path='/add-puchase' element = {<AddPurchase/>}/>
          <Route path='/add-sale' element = {<AddSale/>}/>
        </Route>


          <Route element = {<ProtectComponent role1="CUSTOMER"/>}>

        {/* Customer */}

        <Route path='/customer-dashboard' element={<CustomerDshboard/>}/>
        <Route path='/view-product' element={<ViewProducts/>}/>
        <Route path='/viewOrder' element={<ViewOrder/>}/>
        <Route path='/make-payment/:orderId' element={<MakePayment/>}/>
        <Route path='/custchange-information' element={<CustChangeInformation/>}/>
        <Route path='/makeorder/:productId' element={<MakeOrder/>}/>
        <Route path='/control-number' element={<ControlNumber/>}/>
        <Route path='/cust-paymenet-record' element={<CustPaymentRecord/>}/>
        
       </Route>

        

         <Route element = {<ProtectComponent role1="ADMIN"/>}>

        {/* Admin */}
        <Route path='/admin-dashboard' element = {<AdminDashboard/>}/>
        <Route path='/manage-orders' element = {<AManageOrder/>}/>
        <Route path='/amanage-customers' element = {<AManageCustomer/>}/>
        <Route path='/a-manage-products' element = {<AManageProducts/>}/>
        <Route path='/manage-vendors' element = {<ManageVendors/>}/>
        <Route path='/register-vendors' element = {<RegisterForm/>}/>
        <Route path='/add-vendors' element = {<AddVendors/>}/>
        <Route path='/add-customers' element = {<AddCustomers/>}/>
        <Route path='/vendor-blocker' element = {<VendorBlocker/>}/>
        <Route path='/manage-subscription' element = {<AdminManageSubscription/>}/>


          </Route>
        
        
        
        

      </Routes>

    </div>
  );
}

export default App;
