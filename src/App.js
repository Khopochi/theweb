import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import { Home } from './pages/home/Home';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { ProductView } from './pages/productview/ProductView';
import { Category } from './pages/category/Category';
import { Cart } from './pages/cart/Cart';
import Order from './pages/order/Order';
import Completed from './pages/completed/Completed';
import CaryView from './pages/viewthecart/CaryView';
import { Product } from './pages/productresults/Product';
import { Subcategory } from './pages/productresults/Subcategory';
import { CategorySearch } from './pages/productresults/Category';
import OTP from './pages/otp/OTP';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import UserInfo from './pages/user/UserInfo';
import { useMediaQuery } from 'react-responsive'
import Terms from './pages/terms/Terms';
// import './App.css';

function App() {
  const {user} = useContext(AuthContext)
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' }); // You may adjust the maxWidth as needed

  if (isMobile) {
    const currentPath = window.location.pathname.substring(1); // Remove leading '/'
    window.location.href = `https://www.jiabaili.shop/${currentPath}`;
    return null; // Redirecting, so no need to render anything
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register/' element={<Register/>} />
          <Route path='/login/' element={<Login />} />
          <Route path='/user/info/' element={<UserInfo />} />
          <Route path='/terms/' element={<Terms/>} />
          <Route path='/allproducts/'>
              <Route path=':id' element={<Category/>} />
          </Route>
          <Route path='/viewproduct/'>
              <Route path=':id' element={<ProductView/>} />
          </Route>
          <Route path='/viewcart/' element={<Cart/>} />
          <Route path='/myorders/' element={<Order/>} />
          <Route path='/completed/' element={<Completed/>} />
          <Route path='/ottp/' element={<OTP/>} />
          <Route path='/cartview/'>
              <Route path=':id' element={<CaryView/>} />
          </Route>
          <Route path='/search/'>
              <Route path=':id' element={<Product/>} />
          </Route>
          <Route path='/subproducts/'>
              <Route path=':id' element={<Subcategory/>} />
          </Route>
          <Route path='/categories/'>
              <Route path=':id' element={<CategorySearch/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
