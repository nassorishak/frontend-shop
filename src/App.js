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
import RegisterVendor from './component/Admin/RegisterVendor';
import AManageProducts from './component/Admin/AManageProducts';
import ControlNumber from './component/customer/ControlNumber';
import MakePayment from './component/customer/MakePayment';




function App() {
  return (
    
    <div className="App">
      <Routes>
        {/* login */}
      <Route path='/' element={<Login/>} />
      <Route path='/registerform' element={<Registerform/>} />


      
      

        {/* Vendor */}
        
           <Route path='/vendor-dashboard' element = {<VendorDashboard/>}/>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path='/vewProduct' element={<ViewProduct/>}/>
          <Route path='/manage-Order' element={<ManageOrder/>}/>
          <Route path='/payment-Record' element = {<PaymentRecord/>}/>
          <Route path='/vchange-information' element = {<VChangeInformation/>}/>
       



        {/* Customer */}

        <Route path='/customer-dashboard' element={<CustomerDshboard/>}/>
        <Route path='/view-product' element={<ViewProducts/>}/>
        <Route path='/vewOrder' element={<ViewOrder/>}/>
        <Route path='/make-payment' element={<MakePayment/>}/>
        <Route path='/custchange-information' element={<CustChangeInformation/>}/>
        <Route path='/makeorder/:productId' element={<MakeOrder/>}/>
        <Route path='/control-number' element={<ControlNumber/>}/>
        
       

        

         

        {/* Admin */}
        <Route path='/admin-dashboard' element = {<AdminDashboard/>}/>
        <Route path='/manage-orders' element = {<AManageOrder/>}/>
        <Route path='/amanage-customers' element = {<AManageCustomer/>}/>
        <Route path='/a-manage-products' element = {<AManageProducts/>}/>
        <Route path='/register-vendor' element = {<RegisterVendor/>}/>
        
        
        

      </Routes>

    </div>
  );
}

export default App;
