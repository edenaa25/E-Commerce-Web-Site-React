import {
  Container,
  Typography,
  Grid,
  Select,
  TextField,
  MenuItem,
  Box,
  Button,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productStyle } from "./customerStyle";
import Product from "./Product";
import TrendingFlatIcon from "@mui/icons-material/ArrowForward";
import Cart from "./Cart";
import { useDispatch } from "react-redux";

function Products() {
  const classes = productStyle();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users);
  const orders = useSelector((state) => state.data.orders);
  const categories = useSelector((state) => state.data.categories);
  const products = useSelector((state) => state.data.products);
  const customerCart = useSelector((state) => state.customerCart.cartProduct); //customer cart data
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [titelFilter, setTitleFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  let filteredProducts = [...products];
  const [cartOpen, setCartOpen] = useState(false);

//handle qty in redux customer cart data
  const getQty = (productId) => {
    if (!customerCart) {
      return 0; // Return 0 if customerCart is null or undefined
    }
    const productFromCart = customerCart.find(
      (productCart) => productCart.id === productId
    );
    if (productFromCart) {
      return productFromCart.qty;
    } else {
      return 0;
    }
  };

  //save change qty to customerCart redux state
  const updateQty = (product) => {
    let productFromCart = customerCart.find(
      (productCart) => productCart.id === product.id
    );
    //check if qty in stock and qty not minus
    if (product.qty <= product.stock && product.qty >= 0) {
      let newCart;
      //lineItem not in cart 0=>1
      if (!productFromCart && product.qty === 1) {
        newCart = [...customerCart, product];
      }
      //remove lineItem from cart when qty=0
      else if (product.qty === 0) {
        newCart = customerCart.filter((lineItem) => lineItem.id !== product.id);
      }
      //change qty in exist lineItem
      else {
        newCart = customerCart.map((lineItem) => {
          if (lineItem.id === product.id) {
            return { ...lineItem, qty: product.qty };
          } else {
            return lineItem;
          }
        });
      }
      dispatch({ type: "LOAD_PRODUCTS_TO_CARTS", payload: newCart });
    } else {
      alert("Quantity over stock or zero");
    }
  };

  //remove item from cart in cartList
  const removeFromCartList = (productId) => {
    let newCustomerCart = customerCart.filter(
      (lineItem) => lineItem.id !== productId
    );
    dispatch({ type: "LOAD_PRODUCTS_TO_CARTS", payload: newCustomerCart });
  };

  //Finding the highest price of a product for the slideBar in the filter line 
  useEffect(() => {
    const prices = products
      .map((product) => parseFloat(product.price))
      .filter((price) => !isNaN(price));
    const maxPrice = Math.max(...prices);
    // console.log(maxPrice)
    setMaxPrice(maxPrice);
  }, [products]);


  //Handle filter line
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPriceFilter(+event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setPriceFilter("");
    setTitleFilter("");
    filteredProducts = [...products];
  };

  // Apply filters to products
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryFilter
    );
  }
  if (priceFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= priceFilter
    );
  }
  if (titelFilter) {
    filteredProducts = filteredProducts.filter((product) =>
      product.titel.toLowerCase().includes(titelFilter.toLowerCase())
    );
  }

  //count all orders with “allow others users see my orders” by customer per product
  const countOrders = (productId) => {
    const allowedUsernames = users
      .filter((user) => user.allowOrders)
      .map((user) => user.username);
    // console.log(allowedUsernames)
    // Filter orders containing the productId and placed by allowed users
    const filteredOrders = orders.filter(
      (order) =>
        order.productID === productId &&
        allowedUsernames.includes(order.username)
    );

    // Sum the quantity values in filteredOrders
    const totalQty = filteredOrders.reduce(
      (total, order) => total + +order.qty,
      0
    );
    return totalQty;
  };

  //close cart grom cart component
  const handleCloseCart = () => {
    setCartOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <Grid container spacing={2} >
        <Grid item xs={ cartOpen ? 4 : 1 }  style={{ backgroundColor: cartOpen ? '#EAEAEA' : 'transparent' }} className={classes.pageGridItemsLeft}  >
          {cartOpen ? (
            <Cart
              cartList={customerCart}
              removeFromCartList={removeFromCartList}
              updateQty={updateQty}
              handleCloseCart={handleCloseCart}
            ></Cart>
          ) : (
            <Box  onClick={() => setCartOpen(true)} className={classes.openCartErrowBox} display="flex" alignItems="center" sx={{              
              width: 50,
              height: 100,
              borderRadius: 1,
              bgcolor: '#fafafa',
              '&:hover': {
                bgcolor: '#eeeeee',
              },
              
            
            }}>
                <TrendingFlatIcon fontSize="medium"></TrendingFlatIcon>
            </Box>
           
          )}
        </Grid>

        <Grid item xs={cartOpen ? 8 : 11} className={classes.pageGridItemRight} >
          <Box className={classes.filterBar} >
            <Grid
              container
              alignItems="center"
              spacing={cartOpen ? 1 : { xs: 2, sm: 1, md: 0 }}
              columns={cartOpen ? { xs: 1, sm: 4, md: 8 } : { xs: 4, sm: 8, md: 12 }}
            >
              <Grid item sm={1} xs={12}>
                <Typography display="inline" component="span" sx={{ fontWeight: 'bold' }}>
                  Filter By: 
                </Typography>&nbsp;
              </Grid>
              <Grid item sm={1} xs={12}>
                <Typography display="inline"> Category:</Typography>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Select
                  className={classes.selectFilterBar}
                  display="inline"
                  size="small"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item sm={1} xs={12}>
                <Typography id="price-slider" gutterBottom>
                  Price:{" "}
                </Typography>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Slider
                  className={classes.selectFilterBar}
                  value={+priceFilter}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="price-slider"
                  max={+maxPrice}
                />
              </Grid>
              <Grid item sm={1} xs={12}>
                <Typography display="inline">
                  {priceFilter ? "$" + priceFilter : "$" + 0}
                </Typography>
              </Grid>
              <Grid item sm={1} xs={12}>
                <Typography display="inline">Titel:</Typography>
              </Grid>
              <Grid item sm={2} xs={12}>
                <TextField
                  className={classes.selectFilterBar}
                  size="small"
                  label="Product Title"
                  value={titelFilter}
                  onChange={handleTitleChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={1} xs={12}>
                <Button
                  className={classes.clearButton}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => clearFilters()}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>

          <div>
            {filteredProducts.map((product) => {
              return (
                <Product
                  key={product.id}
                  productData={product}
                  bought={countOrders(product.id)}
                  qty={getQty(product.id)}
                  updateQty={updateQty}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
