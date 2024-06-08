import {
  Select,
  MenuItem,
  Card,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { statisticsPage } from "./adminStyles";
import { useSelector } from "react-redux";
import { AgChartsReact } from "ag-charts-react";

function Statistics() {
  const classes = statisticsPage();
  const users = useSelector((state) => state.data.users).filter(
    (user) => user.role === "customer"
  );
  const orders = useSelector((state) => state.data.orders);
  const products = useSelector((state) => state.data.products);
  const [productsSold, setProductsSold] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userProductsData, setUserProductsData] = useState([]);


  const [pieChartsOptions, setPieChartsOptions] = useState({
    height: 550,
    data: productsSold,
    series: [
      {
        type: "pie",
        angleKey: "qty",
        calloutLabelKey: "productName",
        sectorLabelKey: "qty",
        sectorLabel: {
          color: "black",
          fontWeight: "bold",
        },
        shadow: {
          color: "rgba(0, 0, 0, 0.3)", // Shadow color
          xOffset: 8, // Horizontal offset of the shadow
          yOffset: 5, // Vertical offset of the shadow
          blur: 5, // Blur radius of the shadow
        },
      },
    ],
    background: {
      fill: "#DCDCDC",
    },
  });

  
  const [barChartsOptions, setBarChartsOptions] = useState({
    height: 550,
    data: userProductsData,
   
    series: [
      {
        type: "bar",
        xKey: "productName",
        yKey: "qty",
        label: { enabled: true },
       
      },
    ],
    background: {
      fill: "#DCDCDC",
    },
    axes: [
      {
        type: 'category',
        position: 'bottom',
        paddingInner: 0, // Removes spacing between bars
        paddingOuter: 0, // Removes spacing between bars
      },
      {
        type: 'number',
        position: 'left',
      },
    ],
  });

  //Total sold qty per product
  useEffect(() => {
    const updatedProductsSold = products.map((product) => {
      const sumPerProduct = orders
        .filter((order) => order.productID === product.id)
        .reduce((sum, currValue) => sum + +currValue.qty, 0);

      return { productName: product.titel, qty: sumPerProduct };
    });

    setProductsSold(updatedProductsSold);

    // Update pieChartsOptions here after setting productsSold
    setPieChartsOptions((prevOptions) => ({
      ...prevOptions,
      data: updatedProductsSold,
    }));
  }, [orders, products]);

  //count orders costumer per product
  useEffect(() => {
    const userOrders = (username) => {
      const userOrderItems = orders.filter(
        (order) => order.username === username
      );
      const userProductsData = {};

      userOrderItems.forEach((orderItem) => {
        if (userProductsData[orderItem.productID]) {
          userProductsData[orderItem.productID] += orderItem.qty;
        } else {
          userProductsData[orderItem.productID] = +orderItem.qty;
        }
      });
      const userProductsSold = Object.keys(userProductsData).map(
        (productId) => {
          const product = products.find((p) => p.id === productId);
          return {
            productName: product?.titel,
            qty: +userProductsData[productId],
          };
        }
      );

      setUserProductsData(userProductsSold);

      // Update chartsOptions here after setting productsSold
      setBarChartsOptions((prevOptions) => ({
        ...prevOptions,
        data: userProductsSold,
      }));
    };
    userOrders(selectedUser);
  }, [selectedUser]);


  return (
    <div>
      <h1>Statistics</h1>
      <Card size="sm" className={classes.dashboardCard}>
      {productsSold.length > 0 && (
        <div className={classes.paiChartDiv} >
          <Typography variant="h5">Total Sold Products</Typography>
          <br />
          <AgChartsReact options={pieChartsOptions} />
        </div>
      )}
      </Card>

      <br />
      <br />
      <Card size="sm" className={classes.dashboardCard} >
        <div className={classes.barChartDiv} >
          <Typography variant="h5">Product Quantity Per Customer</Typography>{" "}
          <br />
          <Typography variant="subtitle1">Sort By Customer:</Typography>
          <br />
          {/* <InputLabel>sdfsdf</InputLabel> */}

          <Select
            value={selectedUser}
            displayEmpty
            onChange={(e) => setSelectedUser(e.target.value)}
            sx={{
              borderRadius: "30px",
              width: "55%",
              fontWeight: "normal",
              borderColor: "black",
              "& .MuiSelect-select": {
                paddingRight: "30px", 
              },
            }}
          >
             <MenuItem value="">
              <em>Select Customer</em>
             </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.username}>
                {user.fname + " " + user.lname}
              </MenuItem>
            ))}
          </Select>
        </div>
        {userProductsData?.length > -1 && (
          <AgChartsReact  options={barChartsOptions} />
        )}
      </Card>
      <br />
    </div>
  );
}

export default Statistics;
