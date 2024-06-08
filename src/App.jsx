import * as React from 'react';
import {Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login';
import Admin from './pages/admin/AdminPage'
import Customer from './pages/customer/CustomerPage'
import Customers from './pages/admin/Customers'
import Categories from './pages/admin/Categories'
import Products from './pages/admin/Products'
import Statistics from './pages/admin/Statistics'
import MyAccount from './pages/customer/MyAccount';
import MyOrders from './pages/customer/MyOrders';
import CustomerProducts from './pages/customer/Products';
import {appPage} from './styles'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import db from './firebase';


function App() {
  const classes= appPage()
  const dispatch = useDispatch();

  //Get data from fiebase to redux - users, orders, categories, products, 
  useEffect(() => {
    const loadUsers= ()=>{
      const q = query(collection(db, 'users'));
      onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOADUSERS', payload: users });
      });
    }

    const loadOrders= ()=>{
      const q = query(collection(db, 'orders'));
      onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOAD_ORDERS', payload: users });
      });
    }

    const loadCategories= ()=>{
      const q = query(collection(db, 'categories'));
      onSnapshot(q, (querySnapshot) => {
        const catecories = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOAD_CATEGORIES', payload: catecories });
      });
    }

    const loadProducts= ()=>{
      const q = query(collection(db, 'products'));
      onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOAD_PRODUCTS', payload: products });
      });
    }

    loadUsers()
    loadOrders()
    loadCategories()
    loadProducts()
        
  }, []);

  return (

     <div className={classes.root}>
                <Routes>
                    <Route path='' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                   
                     {/* Nested Routes for Admin */}
                    <Route path='/admin' element={<Admin />} >
                      <Route path='customers' element={<Customers />} />
                      <Route path='categories' element={<Categories />} />
                      <Route path='products' element={<Products />} />
                      <Route path='statistics' element={<Statistics />} />
                    </Route>

                     {/* Nested Routes for Customer */}
                     <Route path='/customer' element={<Customer />} >
                      <Route path='myAccount' element={<MyAccount />} />
                      <Route path='myOrders' element={<MyOrders />} />
                      <Route path='products' element={<CustomerProducts />} />
                    </Route>
                    
                </Routes>
     </div>

    
  )
}

export default App
