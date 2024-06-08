import { Container, TextField, Grid ,Button,Typography,FormControlLabel,Checkbox,Box } from '@mui/material';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {regStyle} from './customerStyle'
import {writeBatch, doc , updateDoc} from 'firebase/firestore';
import db from '../../firebase';


function MyAccount() {
  const classes = regStyle();
  const loginUser = JSON.parse(sessionStorage['loginUser']);
  const users = useSelector((state) => state.data.users);
  const orders = useSelector((state) => state.data.orders);

  const [userData , setUserData] = useState({
      fname: '',
      lname: '',
      username: '',
      password: '',
      allowOrders: false 
    });


// GET ALL USER DATA BY UNIQE USERNAME
  useEffect(() => {
      const getUserData = users.find(user => user.username === loginUser.username);
      if (getUserData) {
        setUserData(getUserData);
      }
    }, [users]);


const setChangesBeforeSave = async () => {
  const userOrders = orders.filter(order => order.username === loginUser.username);
  const batch = writeBatch(db);

  userOrders.forEach(order => {
    const orderRef = doc(db, 'orders', order.id);
    batch.update(orderRef, { username: userData.username });
  });

  try {
    await batch.commit();
    console.log('Orders updated successfully');
  } catch (error) {
    console.error('Error updating order data: ', error);
  }
};

  const saveData=async()=>{
    if(loginUser.username!==userData.username){
      await setChangesBeforeSave()
    }

    if(loginUser.fname!==userData.fname || loginUser.username!==userData.username){
       sessionStorage.setItem('loginUser', JSON.stringify({ id: loginUser.id, username: userData.username, fname: userData.fname }));
      }

    try {     
      const categoryRef = doc(db, 'users', loginUser.id);
      await updateDoc(categoryRef, { ...userData });
      
      } catch (error) {
            console.error('Error updating user data: ', error);
      }
  }

  return (
    <div style={{marginBottom:'3%'}}>
         <Container className={classes.RegContainer} maxWidth='sm' >
          <Grid container spacing={2} justify="center" className={classes.gridContainer} >
                <Grid item xs={12}>
                      <Typography variant='h1' align='center' fontWeight= 'bold' fontSize='30px'>
                     My Account Details
                      </Typography><br/>
                </Grid> 
                <Grid item xs={12}>
                      First name: <br/><br/>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} className={classes.textField} value={userData?.fname} onChange={(e)=>setUserData({...userData, fname:e.target.value})}  id="outlined-basic" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                      Last name: <br/><br/>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} className={classes.textField} value={userData?.lname} onChange={(e)=>setUserData({...userData, lname:e.target.value})} id="outlined-basic" variant="outlined" />             
                </Grid>
                <Grid item xs={12}>
                      User name: <br/><br/>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} className={classes.textField} value={userData?.username} onChange={(e)=>setUserData({...userData, username:e.target.value})} fullWidth id="outlined-basic" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                      Password: <br/><br/>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} className={classes.textField} value={userData?.password} onChange={(e)=>setUserData({...userData, password:e.target.value})} fullWidth id="outlined-basic" variant="outlined" /> 
                </Grid>
                <Grid item xs={12}>
                Allow others to see my orders: <br/>
                <Box textAlign='center'>
                   <FormControlLabel  checked={userData?.allowOrders} onChange={(e)=>setUserData({...userData, allowOrders:e.target.checked})} control={<Checkbox color="default" />}  />
                </Box>
                </Grid>
                <Grid item xs={12}>
                      <Button onClick={()=>saveData()}
                        type="submit"
                        fullWidth
                        color="success"
                        variant="contained"> Save
                      </Button>
                </Grid>
            </Grid>         
        </Container>
      
    </div>
  );
}

export default MyAccount
