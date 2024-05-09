import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import AddCustomer from "./Components/routes/AddCustomer";
import AddOrder from "./Components/routes/AddOrder";
import AddShippingDetails from "./Components/routes/AddShippingDetails";
import Navbar from "./Components/dashboard/Navbar";
import Dashboard from "./Components/dashboard/Dashboard";
function App() {
  return (
    <>
      <div className="w-[100vw] h-[100vh]">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/addShippingAddress" element={<AddShippingDetails />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
