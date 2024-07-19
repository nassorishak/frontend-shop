import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './component/vendor/AddProduct';
import ViewProduct from './component/vendor/ViewProduct';
import ManageOrder from './component/vendor/ManageOrder';
import PaymentRecord from './component/vendor/PaymentRecord';
import VendorDashboard from './component/navigation/VendorDashboard';
import CustomerDshboard from './component/customer/CustomerDshboard';
import MakeOrder from './component/customer/MakeOrder';
import ViewOrder from './component/customer/ViewOrder';
import AdminDashboard from './component/Admin/AdminDashboard';
import AManageOrder from './component/Admin/AManageOrder';
import AManageCustomer from './component/Admin/AManageCustomer';
import AViewOrder from './component/Admin/AViewOrder';
import AChangeInformation from './component/Admin/AChangeInformation';
import VChangeInformation from './component/vendor/VChangeInformation';
import CustChangeInformation from './component/customer/CustChangeInformation';
import CustMakePayment from './component/customer/CustMakePayment';
import Login from './component/Login';
import Registerform from './component/Registerform';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* login */}
      <Route path='/login' element={<Login/>} />
      <Route path='/registerform' element={<Registerform/>} />

        {/* Vendor */}
        
           <Route path='/' element = {<VendorDashboard/>}/>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path='/vewProduct' element={<ViewProduct/>}/>
          <Route path='/manage-Order' element={<ManageOrder/>}/>
          <Route path='/payment-Record' element = {<PaymentRecord/>}/>
          <Route path='/vchange-information' element = {<VChangeInformation/>}/>



        {/* Customer */}

        <Route path='/customer-dashboard' element={<CustomerDshboard/>}/>
        <Route path='/make-order' element={<MakeOrder/>}/>
        <Route path='/vewOrder' element={<ViewOrder/>}/>
        <Route path='/cust-make-payment' element={<CustMakePayment/>}/>
        <Route path='/custchange-information' element={<CustChangeInformation/>}/>
        

         

        {/* Admin */}
        <Route path='/admin-dashboard' element = {<AdminDashboard/>}/>
        <Route path='/amanage-orders' element = {<AManageOrder/>}/>
        <Route path='/amanage-customers' element = {<AManageCustomer/>}/>
        <Route path='/avewOrder' element = {<AViewOrder/>}/>
        <Route path='/achange-information' element = {<AChangeInformation/>}/>
        
        
        

      </Routes>

    </div>
  );
}

export default App;
