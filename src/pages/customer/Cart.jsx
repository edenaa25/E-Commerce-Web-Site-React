import { Typography,Button,Grid,IconButton } from '@mui/material';
import LineItemCart from './LineItemCart'
import { addDoc, collection, doc , updateDoc} from 'firebase/firestore';
import db from '../../firebase';
import { useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartStyle } from "./customerStyle";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {memo} from 'react';


function Cart({ cartList , removeFromCartList , updateQty , handleCloseCart}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = cartStyle();

  const TotalCalculation = () =>{
    const total = cartList.reduce((accumulator, currentValue)=> accumulator + ( currentValue.qty*currentValue.price) , 0)
    return total
  }

  //update stock product 
  async function updateStock(lineItem){
    const categoryRef = doc(db, 'products', lineItem.id);
    await updateDoc(categoryRef, { stock: lineItem.stock-lineItem.qty })         
  }

  //add order to orders table
  async function addOrderLineItem(lineItem){
    let currentDate = new Date().toLocaleDateString('en-GB');
    const loginUser = JSON.parse(sessionStorage['loginUser']);
     const obj = {
        date: currentDate,
        productID: lineItem.id,
        qty :lineItem.qty,
        username: loginUser.username
     }
     try {                
      await addDoc(collection(db, 'orders'), obj);
    
    } catch (error) {
      console.error('Error adding new order: ', error);
    } 
  }

  //logout after order
  const logout=()=>{
    sessionStorage['loginUser']= JSON.stringify({id:'' , username:''}) 
    navigate('/')
  }

  const makeOrder = async()=>{
    cartList.map(lineItem => {
      updateStock(lineItem)
      addOrderLineItem(lineItem)
      //clean user cart in redux
      dispatch({ type: "LOAD_PRODUCTS_TO_CARTS", payload: [] });

    })
     
    logout()
  }

  return (
     <div className={classes.cartDiv} >
        <Grid container>
           <Grid item xs={10}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Cart</Typography>
              {
                cartList.map((product)=>{
                    return <LineItemCart key={product.id} lineItemData={product} removeFromCartList={removeFromCartList} updateQty={updateQty} ></LineItemCart>
                })
              }
              <div style={{marginTop:'20%'}}>
                <Typography variant='h7' sx={{ fontWeight: 'bold' }}>Total: ${TotalCalculation()}</Typography> <br/>
                <Button sx={{ borderRadius: '20px' }} variant="contained" color="success" onClick={()=>makeOrder()}>Order</Button>
              </div>
              
            </Grid>
            <Grid item xs={2} className={classes.iconContainer} >
                <IconButton style={{ backgroundColor: 'transparent' }} onClick={()=>handleCloseCart()} >
                    <KeyboardBackspaceIcon  />
                </IconButton>
            </Grid>
          </Grid>
     </div>
  );
}

export default memo(Cart)
