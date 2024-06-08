import {
  Select,
  Grid,
  FormLabel,
  FormControl,
  TextField,
  Button,
  MenuItem,
  CardContent,
  Card,
} from "@mui/material";
import { useState , memo, useCallback} from "react";
import { productsPage } from "./adminStyles";
import { styled } from "@mui/system";
import DynamicTable from '../DynamicTable';
import { addDoc, collection, deleteDoc, doc , updateDoc, getDoc} from 'firebase/firestore';
import db from '../../firebase';

const StyledTextFiled = styled(TextField, {
  name: "StyledTextFiled",
})({
  width: "60%",
  backgroundColor: "#FDFDFD",
  "& .MuiInputBase-root": {
    height: "30px",
  },
});

function Product({productData,boughtBy, categories, newProduct }) {
  const classes = productsPage();
  const [changeProduct, setChangeProduct] = useState({...productData});
  const [loadingProducts, setLoadingProducts] = useState({});


  const saveChanges = useCallback(async () => {
    //Validation testing:
    //check if a filed is empty
    let flag = true;
    for (const key in changeProduct) {
      if (changeProduct[key] === null || changeProduct[key] === "") {
        flag = false;
        alert("all fields require");
        return;
      }
      flag = true;
    }

    //Price cannot be negative Check:
    if(+changeProduct.price < 0){
          alert("Price cannot be negative")
          return
    }

    //Update or add product - If there is an ID then the product exists, otherwise a new product
    //Update an existing product
    if (productData.id) {
      try {
        setLoadingProducts((prevLoading) => ({ ...prevLoading, [productData.id]: true }));
        const categoryRef = doc(db, 'products', productData.id);
        await updateDoc(categoryRef, { ...changeProduct });
        setLoadingProducts((prevLoading) => ({ ...prevLoading, [productData.id]: false }));
      } catch (error) {
        console.error('Error updating product: ', error);
      }
    //Adding a new product
    } else {
      newProduct(false);
      try {
        await addDoc(collection(db, 'products'), changeProduct);
      } catch (error) {
        console.error('Error adding new product: ', error);
      }
    }
  }, [changeProduct, productData.id, newProduct]);


  const deleteProduct = useCallback(async () => {
    if (productData.id) {
      if (boughtBy?.length === 0) {
        try {
          await deleteDoc(doc(db, 'products', productData.id));
          console.log('delete product');
        } catch (error) {
          console.error('Error delete category: ', error);
        }
      } else {
        alert("Products ordered by customers cannot be deleted");
      }
    } else {
      newProduct(false);
    }
  }, [boughtBy?.length, productData.id, newProduct]);

  return (
    <div >
          <Card className={classes.productsCard}>
            <CardContent>
              <FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormLabel className={classes.formLabelProduct}>Titel: </FormLabel>{" "}
                    <StyledTextFiled
                      defaultValue={productData.titel}
                      type="text"
                      size="small"                   
                      onChange={(e)=>setChangeProduct({...changeProduct,titel:e.target.value})}
                    ></StyledTextFiled>{" "}
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel className={classes.formLabelProduct}>Price: </FormLabel>{" "}
                    <StyledTextFiled
                      required 
                      defaultValue={productData.price}
                      // type="number"
                      size="small"
                      onChange={(e)=>setChangeProduct({...changeProduct , price:e.target.value})}
                    ></StyledTextFiled>{" "}
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel className={classes.formLabelProduct}>Category: </FormLabel>
                    <Select
                      className={classes.selectProduct}
                      size="small"
                      value={changeProduct.category? changeProduct.category : ''}                    
                      onChange={(e)=>setChangeProduct({...changeProduct,category:e.target.value})}
                    >
                      {categories.map((cat) => {
                        return (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel className={classes.formLabelProduct}>Link to pic: </FormLabel>{" "}
                    <StyledTextFiled
                      defaultValue={productData.pic}
                      type="text"
                      size="small"
                      onChange={(e)=>setChangeProduct({...changeProduct , pic:e.target.value})}

                    ></StyledTextFiled>{" "}
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <div className={classes.descriptionProduct}>

                    <FormLabel className={classes.formLabelProduct}>Description: </FormLabel>{" "} <br/>
                    <TextField
                      // className={classes.formLabelProduct}
                      // inputProps={{ className: classes.formLabelProduct }}
                      multiline
                      rows={4}
                      type="text"
                      size="small"
                      defaultValue={productData.description}
                      onChange={(e)=>setChangeProduct({...changeProduct,description:e.target.value})}
                      inputProps={{ style: { resize: 'both' } }}
                      InputLabelProps={{ style: { resize: 'both' } }}
                    ></TextField>{" "}
                      </div>
                    <br />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <FormLabel className={classes.formLabelProduct}>Bought By: </FormLabel>
                      <DynamicTable data={boughtBy} />
                  </Grid>
                </Grid>
                <Grid container>
                     <Grid item xs={12} sm={2}>
                         <Button className={classes.productButton} variant="contained" onClick={() => saveChanges()}>Save</Button>
                          {/* {renderSaveButton(productData.id)} */}
                      </Grid>
                      <Grid item xs={12} sm={2}>
                            <Button className={classes.productButton} variant="contained" onClick={() => deleteProduct()}>Delete</Button>
                      </Grid>
                </Grid>
              </FormControl>
            </CardContent>
          </Card>
    </div>
  );
}

export default memo(Product);
