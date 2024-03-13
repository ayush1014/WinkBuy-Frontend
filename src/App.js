import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Fashion from './Components/Products/Fashion'
import Health from './Components/Products/Health'
import Technology from './Components/Products/Technology'
import WomenProducts from './Components/Products/WomenProducts'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Components/Admin';
import AddProduct from './Components/Products/AddProduct';
import ProductDetail from './Components/Products/ProductDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AdminLogin from './Components/AdminLogin'
import AdminSignup from './Components/AdminSignup'
import MenProducts from './Components/Products/MenProducts';
import HomeDecorProducts from './Components/Products/HomeDecorProducts';
import CarAccessories from './Components/Products/CarAccessories';
import AddBlogs from './Components/Blogs/addBlogs';
import 'react-quill/dist/quill.snow.css';


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
          <Route path='/men/:type' element={<MenProducts />} />
          <Route path='/women/:type' element={<WomenProducts/>}/>
          <Route path='/homeDecor/:type' element={<HomeDecorProducts/>} />
          <Route path='/technology/:type' element={<Technology/>}/>
          <Route path='/health/:type' element={<Health />} />
          <Route path='/carAccessories/:type' element={<CarAccessories/>} />
          <Route path='/productDetail/:product_id' element={<ProductDetail/>}/>



          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/addproducts' element={<AddProduct/>}/>
          <Route path='/admin/addblogs' element={<AddBlogs/>}/>
          <Route path='/admin/homeDecor/:type' element={<HomeDecorProducts/>} />
          <Route path='/admin//men/:type' element={<MenProducts />} />
          <Route path='/admin/fashion' element={<Fashion/>}/>
          <Route path='/admin/health' element={<Health/>}/>
          <Route path='/admin/technology' element={<Technology/>}/>
          <Route path='/admin/women/:type' element={<WomenProducts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
