import {
  Button,
  Box,
  TextField,
} from "@mui/material";
import {  useState } from "react";
import { categoriesPage } from "./adminStyles";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import db from "../../firebase";
import Category from './Category'

function Categories() {
  const classes = categoriesPage();
  const categories = useSelector((state) => state.data.categories);
  const [newCategory, setnewCategory] = useState({ name: "" });


  const handleAdd = () => {
    if (newCategory.name) {
      const addCategory = async () => {
        try {
          // Perform Firestore operation
          await addDoc(collection(db, "categories"), {
            name: newCategory.name,
          });

          setnewCategory({ name: "" });
        } catch (error) {
          // Handle error
          console.error("Error adding category: ", error);
        }
      };
      addCategory();
    } else {
      alert("category name is empty");
    }
  };


  return (
    <div >
      <h1>Categories</h1>
      <div 
        className={classes.categoriesContainer}
        >
        {categories.map((category) => {
          return (
             <Category key={category.id} category={category} ></Category>
          );
        })}
        <br/>
        <Box sx={{ display: "grid", gridAutoColumns: "1fr", gap: 1 }}>
          <TextField
            fullWidth
            sx={{ gridRow: "1", gridColumn: "span 3" }}
            value={newCategory.name}
            onChange={(e) =>
              setnewCategory({ ...newCategory, name: e.target.value })
            }
            size="small"
            className={classes.categoryTextField}
            id="outlined-basic"
            label="Add new category"
            variant="outlined"
          >
            {" "}
          </TextField>
          <Button
            className={classes.addButton}
            sx={{ gridRow: "1", gridColumn: "4 / 5" }}
            variant="contained"
            onClick={() => handleAdd()}
          >
            Add
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Categories;
