import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import HomeDecor from './Components/Products/HomeDecor'
import Clothing from './Components/Products/Clothing'
import Fashion from './Components/Products/Fashion'
import Health from './Components/Products/Health'
import Technology from './Components/Products/Technology'
import Automotive from './Components/Products/Automotive'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Components/Admin';
import AddProduct from './Components/Products/AddProduct';
import ProductDetail from './Components/Products/ProductDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AdminLogin from './Components/AdminLogin'
import AdminSignup from './Components/AdminSignup'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/AdminLogin' element={<AdminLogin/>} />
          <Route path='/AdminSignup' element={<AdminSignup/>} />
          <Route path='/homeDecor' element={<HomeDecor/>} />
          <Route path='/clothing' element={<Clothing />} />
          <Route path='/fashion' element={<Fashion />} />
          <Route path='/health' element={<Health />} />
          <Route path='/technology' element={<Technology/>}/>
          <Route path='/automotive' element={<Automotive/>}/>
          <Route path='/productDetail' element={<ProductDetail/>}/>



          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/addproducts' element={<AddProduct/>}/>
          <Route path='/admin/homeDecor' element={<HomeDecor/>}/>
          <Route path='/admin/clothing' element={<Clothing/>}/>
          <Route path='/admin/fashion' element={<Fashion/>}/>
          <Route path='/admin/health' element={<Health/>}/>
          <Route path='/admin/technology' element={<Technology/>}/>
          <Route path='/admin/automotive' element={<Automotive/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
