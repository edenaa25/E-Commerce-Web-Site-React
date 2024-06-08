import {useState,useEffect} from 'react';
import {adminPage} from './adminStyles'
import { useSelector } from 'react-redux';
import DynamicTable from '../DynamicTable';


function Customers() {

  const classes = adminPage();
  const users = useSelector((state) => state.data.users);
  const orders = useSelector((state) => state.data.orders);
  const products = useSelector((state) => state.data.products);
  const [finalData,setFinalData] = useState([])
  const [costumers,setCostumers] = useState([])

//Showing customers only
  useEffect(()=>{
    let costumers= users.filter(user => user.role==='customer')
    setCostumers(costumers)
  },[users])
  
  useEffect(()=>{
    if (costumers.length > 0 ){
        const newData=[]
        let userOrders=[]
        costumers.map((costumer)=>{
          userOrders= orders.filter((order) => order.username === costumer.username)
          .map((order) => {
              const product = products.find((product) => product.id === order.productID);
             
              return { Product: product?.titel, Qty: order.qty, Date: order.date };
             
              
          });
          
          newData.push({
                  FullName: costumer.fname + ' ' + costumer.lname,
                  JoinDate: costumer.joinDate,
                  ProductsBought: userOrders
               });

        })
        setFinalData(newData);
    }

  }, [costumers, orders, products])

 
  return (
    <div style={{padding:'5%', paddingTop:0}}>
        <h1>Customers</h1>
        <DynamicTable data={finalData}></DynamicTable> 
    </div>

    
  )
}

export default Customers
