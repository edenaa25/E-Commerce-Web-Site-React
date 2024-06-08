import { makeStyles } from "@material-ui/core/styles";
import React , {memo} from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";
import {  useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: "collapse",
    width: "80%",
    
  },
  th: {
    backgroundColor: "#ECECEC", // Background color for column headers
  },
  td: {
    border: "1px solid #F2F2F2", // Border for table cells
    padding: "8px",
  },
}));

function DynamicTable({ data }) {
  const classes = useStyles();

  useEffect(()=>{
    console.log("DynamicTable component")
  })

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract column names from the first object in the data array
  const columns = Object.keys(data[0]);
  const columnsToShow = columns.map((col) => {
    // Split the column name by uppercase letters
    const words = col.split(/(?=[A-Z])/);
    // Capitalize the first letter of each word and join them with a space
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            {columnsToShow.map((column, index) => (
              <TableCell  sx={{ fontWeight: 'bold' }} align="center" key={index} className={classes.th}>
                {column}{" "}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell align="center"
                  sx={{ borderTop: 1 }}
                  key={colIndex}
                  className={classes.td}
                >
                  {/* Check if cell value is an object */}
                  {typeof row[column] === "object" ? (
                    // If it's an object, check if it's an array to render another DynamicTable
                    Array.isArray(row[column]) ? (
                      <DynamicTable data={row[column]} />
                    ) : (
                      // Otherwise, render its values
                      Object.values(row[column]).join(", ")
                    )
                  ) : (
                    // Otherwise, render the cell value
                    row[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo (DynamicTable);
