import { Typography, Grid , Button , TextField } from "@mui/material";
import {memo} from 'react';
import {productStyle} from './customerStyle'

function Product({productData, bought, qty ,updateQty}) {
  const classes = productStyle();

  const plusOneQty =()=>{ 
    const updatedQty = qty + 1; 
    updateQty({ ...productData, qty: updatedQty });
  }

  const minusOneQty =()=>{
    const updatedQty = qty - 1; 
    updateQty({ ...productData, qty: updatedQty }); 
  }

  return (
    <div className={classes.productBorder}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={4}> 
            <Grid container spacing={1} sx={{ textAlign: 'left' }} direction="row">
                <Grid item xs={12} > 
                    <Typography sx={{ fontWeight: 'bold' }} variant="h5">{productData.titel}</Typography>
                </Grid>
                <Grid item xs={12}> 
                    <Typography variant="body1">{productData.description}</Typography>
                </Grid>
                <Grid item xs={12}> 
                    <Typography variant="body1">price: ${productData.price}</Typography>
                </Grid>
                <Grid item xs={12}> 
                    <Typography variant="body1">In stock: {productData.stock}</Typography>
                </Grid>
                <Grid item xs={12}> 
                    <Button onClick={()=>plusOneQty()}  sx={{
                           width:10,
                          "& .MuiButtonBase-root":{
                            height:5 ,
                            borderRadius: '20px' ,
                          }
                      }}>+</Button>
                    <TextField 
                    value={qty} 
                    sx={{
                          width:50 , 
                         
                          "& .MuiInputBase-root":{
                            height:50 ,
                            borderRadius: '20px' ,
                          }
                      }}
                    >
                      </TextField>
                    <Button onClick={()=>minusOneQty()}>-</Button>                    
                </Grid>
            </Grid>           
        </Grid>
        <Grid item xs={12} sm={4}>
           <img src={productData.pic} alt={productData.titel} style={{width: 150, height: 180 }}></img>
        </Grid>
        <Grid item  xs={12} sm={2} >
           <Typography  variant="body2">Bought {bought}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(Product)
