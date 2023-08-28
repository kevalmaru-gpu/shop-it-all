import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';

import HomePage from './containers/home/HomePage';
import Header from './components/header/Header';
import Product from './containers/product/Product';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import Cart from './containers/cart/Cart';
import Profile from './containers/account/Profile'
import Search from './containers/search/Search'

import { AuthContext } from './store/auth-context';
import MainWraper from './ui/MainWraper';
import ConfirmModel from './containers/model/ConfirmModel';


function App() {
  const authContext = useContext(AuthContext)
  const notRestricted = ['/login', '/register']

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const authentication = async () => {
      const response = await authContext.verifyUser()
      setLoading(false)
      if (response.status === 'success' && notRestricted.includes(window.location.pathname)){
        authContext.updateIsLoggedIn(true)
        window.location.pathname = '/'
      } else if (response.status === 'failed' && !notRestricted.includes(window.location.pathname)) {
        window.location.pathname = '/login'
      }
    }
    authentication()
  }, [])

  return (
  <div className='root'>
    
      <ConfirmModel />
      <BrowserRouter>
    { !notRestricted.includes(window.location.pathname) && <Header/> }
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
