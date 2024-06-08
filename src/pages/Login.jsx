import { Container, TextField, Grid, Button, Typography } from "@mui/material";
import { useState , useEffect } from "react";
import { loginStyle } from "../styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Login() {
  const classes = loginStyle();
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.users);
  const [user, setUser] = useState({ username: "", password: "" });

  function authentication() {
    const foundUser = users.find(
      (userFromDB) =>
        userFromDB.username === user.username &&
        userFromDB.password === user.password
    );

    if (foundUser) {     
      sessionStorage['loginUser']= JSON.stringify({id:foundUser.id , username:foundUser.username, fname:foundUser.fname}) 
      
      // Redirect user based on role
      if (foundUser.role === "admin") {
        navigate("/admin");
      } else if (foundUser.role === "customer") {
        navigate("/customer");
      }
    } else {
      alert("Username or password not exist")
    }
  }

  return (
    <div>
      <Container maxWidth="sm" className={classes.Container}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography
              variant="h1"
              align="center"
              fontWeight="bold"
              fontSize="30px"
            >
              Next Generation E-Commerce
            </Typography>
            <br />
          </Grid>
          <Grid item xs={12}>
            User Name: <br />{" "}
            <TextField
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className={classes.textField}
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            Password: <br />{" "}
            <TextField
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className={classes.textField}
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => authentication()}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="subtitle2">
              New User?{" "}
              <Button onClick={() => navigate("register")}>Register</Button>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
