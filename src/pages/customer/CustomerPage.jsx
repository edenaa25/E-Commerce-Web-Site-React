import { Container, Typography, Grid, Link, Box } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import {customerStyle} from './customerStyle'

function CustomerPage() {
  const navigate = useNavigate();
  const classes = customerStyle();
  const loginUser = JSON.parse(sessionStorage['loginUser']);

  //clear seassionStorage when log out
  const logout=()=>{
    sessionStorage['loginUser']= JSON.stringify({id:'' , username:'', fname:''}) 
    navigate('/')
  }

  return (
    <div className={classes.root} >
      <Container disableGutters maxWidth={false} className={classes.container}>
        <Box className={classes.box}>
          <Typography variant="h4">Hello {loginUser.fname}</Typography> <br />
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={3}>
              <Link
                onClick={() => navigate("products")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                 Products
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Link
                onClick={() => navigate("myOrders")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
               My Orders
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Link
                onClick={() => navigate("myAccount")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
               My Account
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Link
                onClick={() => logout()}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                Log Out
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}

export default CustomerPage
