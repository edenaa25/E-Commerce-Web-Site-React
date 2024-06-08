import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {customerStyle} from './customerStyle'
import DynamicTable from "../DynamicTable";

function MyOrders() {

  const classes = customerStyle();
  const orders = useSelector((state) => state.data.orders);
  const products = useSelector((state) => state.data.products);
  const [userOrders,setUserOrders] = useState([])
  const [loginUser, setLoginUser] = useState(null);

//get user from sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage['loginUser']);
    setLoginUser(user);
  }, []);


  useEffect(() => {
    if (loginUser) {
      const allOrders = orders.filter(order => order.username === loginUser.username);
      const newData = allOrders.map(order => {
        const product = products.find(product => product.id === order.productID);
        if (product) {
          return {
            Titel: product.titel,
            Qty: order.qty,
            Total: "$" + (+order.qty) * (+product.price),
            date: order.date
          };
        }
        return null;
      }).filter(order => order !== null);
      setUserOrders(newData);
    }
  }, [loginUser, orders, products]);

  

  return (
    <div style={{padding:'1% 5%'}}>
      <h1>Orders</h1>
      {loginUser && <DynamicTable data={userOrders}></DynamicTable> }
    </div>
  );
}

export default MyOrders