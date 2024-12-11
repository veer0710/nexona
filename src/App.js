import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import MensFashion from './Components/MensFashion';
import WomensFashion from './Components/WomensFashion';
import MobileAccessories from './Components/MobileAccessories';
import Electronics from './Components/Electronics';
import HomeKitchenFurniture from './Components/HomeKitchenFurniture';
import BeautySkinCareGrocery from './Components/BeautySkinCareGrocery';
import PerfumesJewellery from './Components/PerfumesJewellery';
import SportsSunglasses from './Components/SportsSunglasses';
import VehicleMotorcycle from './Components/VehicleMotorcycle';
import SingleProductPage from './Components/SingleProductPage';
import Wishlist from './Components/Wishlist';
import { WishlistProvider } from './Components/WishlistContext';
import Cart from './Components/Cart';
import { AddToCart } from './Components/AddToCart';
import { SearchProvider } from './Components/SearchContext';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { UserLoginContextProvider } from './Components/UserLoginContext';
import { BuynowContext } from './Components/BuynowContext';
import Buynow from './Components/Buynow';

function App() {

  // fetch('https://fakestoreapi.com/products')
  // .then(response=> response.json())
  // .then(json => console.log(json))

  return (
    <>
      <UserLoginContextProvider>
        <SearchProvider>
          <BuynowContext>
            <AddToCart>
              <WishlistProvider>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/MensFashion' element={<MensFashion />} />
                    <Route path='/WomensFashion' element={<WomensFashion />} />
                    <Route path='/MobileAccessories' element={<MobileAccessories />} />
                    <Route path='/Electronics' element={<Electronics />} />
                    <Route path='/HomeKitchenFurniture' element={<HomeKitchenFurniture />} />
                    <Route path='/BeautySkinCareGrocery' element={<BeautySkinCareGrocery />} />
                    <Route path='/PerfumesJewellery' element={<PerfumesJewellery />} />
                    <Route path='/SportsSunglasses' element={<SportsSunglasses />} />
                    <Route path='/VehicleMotorcycle' element={<VehicleMotorcycle />} />
                    <Route path='/SingleProductPage/:productId' element={<SingleProductPage />} />
                    <Route path='/Wishlist' element={<Wishlist />} />
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/Buynow' element={<Buynow />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/Login' element={<Login />} />

                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </AddToCart>
          </BuynowContext>
        </SearchProvider>
      </UserLoginContextProvider>
    </>
  );
}

export default App;
