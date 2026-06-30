import { Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & General Components
import NavBars from "./components/NavBars";
import Home from "./components/Home";
import Product from "./components/Product";
import HandleLogin from "./components/LoginComponents/HandleLogin";
import SignUp from "./components/LoginComponents/SignUp";

// Industries/Sectors
import CategoryPage from "./components/Industries/CategoryPage";
import RawMaterial from "./components/Industries/RawMaterial";

// Dashboards & Security
 // The new security wrapper
import AdminPanel from "./components/Dashboards/AdminPanel";
 // Ensure you have this file
import DistributorPanel from "./components/Panels/DistributorPanel";
import SupplierPanel from "./components/Panels/SupplierPanel";
import EmployeePanel from "./components/Panels/EmployeePanel";
import UserPanel from "./components/Dashboards/UserPanel";
import BuyProduct from "./components/Buying/BuyProduct";
import ProtectedPanel from "./components/LoginComponents/ProtectedPanel";
import CustomerPanel from "./components/Panels/CustomerPanel";

function App() {
  return (
    <>
      <NavBars />
      
      <Routes>
        {/* Public Routes  for Login And Panel Access Related*/}
        <Route path="/login" element={<HandleLogin />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/customer" element={<CustomerPanel />} />
         <Route path="/supplier" element={<SupplierPanel />} />
         <Route path="/distributor" element={<DistributorPanel />} />
        <Route path="/employee" element={<EmployeePanel />} />
        
        
        
        {/*Home Page Related Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        
        
        <Route path="/raw-material" element={<RawMaterial />} />
        <Route path="/sector/:sectorName" element={<CategoryPage />} />
        <Route path="/buy/:id" element={<BuyProduct />} />

        {/* --- PROTECTED ROUTES (Requires Login Gate) --- */}

        {/* Admin Control */}
        <Route path="/admin" element={
          <ProtectedPanel requiredRole="Admin" panelName="Master Admin Control">
            <AdminPanel />
          </ProtectedPanel>
        } />

        {/* Employee / Inventory Control */}
        <Route path="/employee-panel" element={
          <ProtectedPanel requiredRole="Employee" panelName="Inventory Management">
            <EmployeePanel />
          </ProtectedPanel>
        } />

        {/* Distributor / Logistics Control */}
        <Route path="/distributor-panel" element={
          <ProtectedPanel requiredRole="Distributor" panelName="Logistics & Shipping Hub">
            <DistributorPanel />
          </ProtectedPanel>
        } />

        {/* Supplier Control */}
        <Route path="/supplier" element={
          <ProtectedPanel requiredRole="Supplier" panelName="Supplier Portal">
            <SupplierPanel />
          </ProtectedPanel>
        } />

        {/* User Personal Dashboard */}
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/customer" element={<CustomerPanel />} />
        
      </Routes>

      {/* Global Notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;