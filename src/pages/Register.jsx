import { Container, TextField, Grid ,Button,Typography,FormControlLabel,Checkbox } from '@mui/material';
import * as React from 'react';
import {regStyle} from '../styles'
import {useState} from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';

function Register() {

  const classes = regStyle();
  const navigate = useNavigate();
  let currentDate = new Date().toLocaleDateString('en-GB');
  const [newUser, setNewUser]= useState({
        fname:'', lname:'', username:'', password:'', role: 'customer', allowOrders: false, joinDate: currentDate
    }
  )
  const users = useSelector((state) => state.data.users);

  const addUser= async()=>{
    console.log(newUser)
        if (checkEmptyValues(newUser)) {
          alert("Please fill in all fields");
          return; 
        }
        if (checkUserName(newUser.username)) {
          alert("Username already exists");
          return; 
        }

        await addDoc(collection(db, 'users'), newUser);
        navigate(-1)

  }

  function checkUserName(userName){
    console.log(users)
      for (let user of users) {
        // If the username exists, return true
        if (user.username === userName) {
          return true;
        }
      }
      // If the username doesn't exist, return false
      return false;
  }

  function checkEmptyValues(user) {
    for (let key in user) {
      if (user[key] === '') {
        return true; // Return true if any value is empty
      }
    }
    return false; // Return false if all values are filled
  }

  return (
    <div>
        <Container className={classes.RegContainer} maxWidth='sm' >
          <Grid container spacing={2} justify="center" className={classes.gridContainer} >
                <Grid item xs={12}>
                      <Typography variant='h1' align='center' fontWeight= 'bold' fontSize='30px'>
                      New User <br/> Registration
                      </Typography><br/>
                </Grid> 
                <Grid item xs={12}>
                      First name: <br/><br/>
                      <TextField className={classes.textField} onChange={(e)=>setNewUser({...newUser, fname:e.target.value})}  id="outlined-basic" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                      Last name: <br/><br/>
                      <TextField  className={classes.textField} onChange={(e)=>setNewUser({...newUser, lname:e.target.value})} id="outlined-basic" variant="outlined" />             
                </Grid>
                <Grid item xs={12}>
                      User name: <br/><br/>
                      <TextField className={classes.textField} onChange={(e)=>setNewUser({...newUser, username:e.target.value})} fullWidth id="outlined-basic" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                      Password: <br/><br/>
                      <TextField className={classes.textField} onChange={(e)=>setNewUser({...newUser, password:e.target.value})} fullWidth id="outlined-basic" variant="outlined" /> 
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel onChange={(e)=>setNewUser({...newUser, allowOrders:e.target.checked})} control={<Checkbox />} label="Allow others to see my orders" />
                </Grid>
                <Grid item xs={12}>
                      <Button onClick={()=>addUser()}
                        type="submit"
                        fullWidth
                        variant="contained"> Create
                      </Button>
                </Grid>
            </Grid>         
        </Container>
      
    </div>
  )
}

export default Register; 
