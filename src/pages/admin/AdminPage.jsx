import { Container, Typography, Grid, Link, Box } from "@mui/material";
import {  useCallback  } from "react";
import { adminPage } from "./adminStyles";
import { useNavigate, Outlet } from "react-router-dom";

function AdminPage() {
  const classes = adminPage();
  const navigate = useNavigate();

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

    //clear seassionStorage when log out
    const logout=()=>{
      sessionStorage['loginUser']= JSON.stringify({id:'' , username:'', fname:''}) 
      navigate('/')
    }

  //nav bar for all admin pages
  return (
    <div className={classes.root}>
      <Container disableGutters maxWidth={false} className={classes.container}>
        <Box className={classes.box}>
          <Typography variant="h4">Hello, Admin</Typography> <br />
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={2.4}>
              <Link
                onClick={() => handleNavigate("categories")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                Catergories
              </Link>
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Link
                onClick={() => handleNavigate("products")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                Products
              </Link>
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Link
                onClick={() => handleNavigate("customers")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                Customers
              </Link>
            </Grid>
            <Grid item xs={12} sm={2.4}>
              <Link
                onClick={() => handleNavigate("statistics")}
                underline="none"
                color="inherit"
                component="button"
                variant=""
              >
                Statistics
              </Link>
              </Grid>
              <Grid item xs={12} sm={2.4}>
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

export default AdminPage;
