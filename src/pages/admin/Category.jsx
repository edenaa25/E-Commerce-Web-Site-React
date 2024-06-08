import {
  Button,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import {  useState } from "react";
import { categoriesPage } from "./adminStyles";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { useSelector } from "react-redux";


function Category({ category }) {
  const classes = categoriesPage();
  const [newName, setNewName] = useState("");
  const [editableCategory, setEditableCategory] = useState(null);
  const products = useSelector((state) => state.data.products);
  const orders = useSelector((state) => state.data.orders);

  const handleEdit = (category) => {
    setEditableCategory(category.id);
    setNewName(category.name);
  };

  const handleSave = async (category) => {
    const updatedCategory = { ...category, name: newName };

    try {
      const categoryRef = doc(db, "categories", category.id);
      await updateDoc(categoryRef, { name: updatedCategory.name });
      setEditableCategory(null); // Reset editable category
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  //Checking whether there are products ordered in the category.
  //If so, we will not allow deletion of a category
  const checkOrdersCategoryProducts=()=>{
      let categoryProducts = products.filter( pro => pro.category === category.id)
      categoryProducts = categoryProducts.map(pro => pro.id)
      for(let i=0; i<orders.length ; i++){
        if(categoryProducts.includes(orders[i].productID)){
          return true
        }
      }
     
      return false
  }

  //Delete all product category 
  const deleteProductsCategory = ()=>{
    products.forEach(async(pro) =>  {
      if(pro.category === category.id){

        try {
          await deleteDoc(doc(db, "products", pro.id));
          console.log("delete product");

        } catch (error) {
          // Handle error
          console.error("Error delete product: ", error);
        }
        
        
      }
    });

  }

  const handleRemove = async (category) => {
    if(checkOrdersCategoryProducts()==false){
      try {
        //Delete all Products Under Current Category
        deleteProductsCategory()
        // Perform Firestore operation - Delete Category from DB
        await deleteDoc(doc(db, "categories", category.id));
        console.log("delete category");
      } catch (error) {
        // Handle error
        console.error("Error delete category: ", error);
      }
    }
    else{
      alert("It is not possible to delete a category of products under which they were sold to customers")
    }
          
  };

  return (
          <Grid
                container
                spacing={2}
                alignItems="center"
                className={classes.categoriesContainerGrid}
                sx={{ margin: 0, width: "100%" }} // Add sx prop to override MUI CSS
              >
                <Grid
                  item
                  style={{ maxWidth: "100%" }}
                  sm={3}
                  xs={12}
                  className={classes.categoriesItemGrid}
                  sx={{ display: "flex", alignItems: "center" ,  padding: '16px' }} // Override item margin and center items

                >
                  {editableCategory === category.id ? (
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      defaultValue={category.name}
                      fullWidth
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    <Typography variant="h6">{category.name}</Typography>
                  )}
                </Grid>
                <Grid
                  item
                  sm={2}
                  xs={12}
                  className={classes.categoriesItemGrid}
                  sx={{ display: "flex", alignItems: "center" ,  padding: '16px' }} // Override item margin and center items

                >
                  {editableCategory === category.id ? (
                    <Button
                      className={classes.categoryButton}
                      variant="contained"
                      onClick={() => handleSave(category)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className={classes.categoryButton}
                      variant="contained"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
                <Grid
                  item
                  sm={2}
                  xs={12}
                  className={classes.categoriesItemGrid}
                  sx={{ display: "flex", alignItems: "center" ,  padding: '16px' }} // Override item margin and center items
                >
                  <Button
                    className={classes.categoryButton}
                    variant="contained"
                    onClick={() => handleRemove(category)}
                  >
                    Remove
                  </Button>
                </Grid>
          </Grid>
  );
}

export default Category;
