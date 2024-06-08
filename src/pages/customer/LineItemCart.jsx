import {
  IconButton,
  Grid,
} from "@mui/material";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import { LineItemCartStyle } from "./customerStyle";
import {memo} from 'react';


function LineItemCart({ lineItemData, removeFromCartList, updateQty }) {
  const classes = LineItemCartStyle();

  const plusOneQty = () => {
    const updatedQty = lineItemData.qty + 1;
    updateQty({ ...lineItemData, qty: updatedQty });
  };

  const minusOneQty = () => {
    const updatedQty = lineItemData.qty - 1;
    updateQty({ ...lineItemData, qty: updatedQty });
  };

  return (
    <div>
      <Grid
        container direction="row"
        sx={{ borderRadius: "16px", bgcolor: "#e0e0e0" }}
        className={classes.box}
        
      >
        <Grid item xs={12} md="auto" sx={{ display: 'flex', alignItems: 'center' }}>{lineItemData.titel} -</Grid>
        <Grid item xs={12}  md="auto">
          <IconButton aria-label="PLUS" onClick={() => plusOneQty()}>
            <AddBoxTwoToneIcon />
          </IconButton>
          {lineItemData.qty}
          <IconButton aria-label="MINUS" onClick={() => minusOneQty()}>
            <IndeterminateCheckBoxTwoToneIcon />
          </IconButton>
          units -
        </Grid>
        <Grid item xs={12} md="auto">
          Total: ${lineItemData.qty * lineItemData.price}
          <IconButton
            aria-label="ADD"
            onClick={() => removeFromCartList(lineItemData.id)}
          >
            <CancelIcon sx={{ color: "#C38686" }} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(LineItemCart);
