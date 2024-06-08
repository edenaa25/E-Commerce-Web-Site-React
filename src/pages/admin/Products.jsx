import { Button } from "@mui/material";
import { useState ,useCallback } from "react";
import { productsPage } from "./adminStyles";
import { useSelector } from "react-redux";
import Product from './Product'

function Products() {
  const classes = productsPage();
  const users = useSelector((state) => state.data.users);
  const orders = useSelector((state) => state.data.orders);
  const categories = useSelector((state) => state.data.categories);
  const products = useSelector((state) => state.data.products);
  const [newProductIsClicked , setNewProductIsClicked]=useState(false)

 
//Calculate sales for a product 
  const productOrders =useCallback((product) =>{
      const newData = []
      const productOrders = orders.filter((order)=> order.productID===product.id)
      productOrders.map(proOrder => {
          const user= users.find(user => user.username === proOrder.username)
          // console.log(user)
          const obj= {name: user?.fname, qty: proOrder.qty, date:proOrder.date}
          newData.push(obj);
      })
      return newData
  },[[orders, users]])
  
 
//Toggel a new product section
  const newProduct = useCallback((res) => {
    setNewProductIsClicked(res);
  }, []);
  
  const newObj={category:'', description:'' , pic:'', price:'' , titel:'' }

  return (
    <div  className={classes.productDiv} >
      {products.map((product) => {
        return <Product key={product.id} productData={product} boughtBy={productOrders(product)}  categories={categories}></Product>
      })}
      {newProductIsClicked? <Product productData={newObj} categories={categories} newProduct={newProduct}></Product> : null}
      <Button className={classes.productsButton} variant="contained" onClick={()=>newProduct(true)}>ADD NEW</Button>
    </div>
  );
}

export default Products;
