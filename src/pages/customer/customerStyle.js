import { makeStyles } from "@material-ui/core/styles";

// Define styles for the AdminPage component
const customerStyle = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: "#DCDCDC",
      minHeight: "100vh", // Set minimum height to ensure content is always visible
      display: "flex",
      flexDirection: "column", // Align children in a column
      paddingLeft: "0px",
    },

    container: {
      textAlign: "center",
    

    },

    box: {
      marginBottom: "3%",
      paddingBottom: "5%",
      paddingTop: "2%",
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      width: "100%",
    },

   
  };
});

//Account Page is the same style like Register Page 
const regStyle = makeStyles((theme)=> {
  return {
      RegContainer:{
          backgroundColor: 'White',
          padding: theme.spacing(3), 
          textAlign:'left',

      },
      gridContainer: {
          padding: theme.spacing(2), // Add padding to the grid container
          fontWeight: 'bold',


      },
      
      textField: {          
          width: '100%', // Full width
          '& .MuiInputBase-root': {
              height: '30px', // Adjust height as needed
          },
             
      },
  }
}

);

const productStyle = makeStyles((theme)=> {
  return {
   
      productBorder:{
        border: "1px solid rgba(0, 0, 0, 0.1)", // Border color and thickness
        borderRadius: "8px", // Rounded corners
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        padding: theme.spacing(2), // Add padding for content      
        margin: '3%',
        backgroundColor:'#EFEEEE',
      },

      pageGridItemRight:{
       
        paddingRight: "3%"
      },

      pageGridItemsLeft:{
        // paddingLeft:'0px !important',
        // textAlign:'left'
        // paddingRight: "1%"
        // backgroundColor:'#EAEAEA'
      },

      filterBar:{
        backgroundColor:'#EFEEEE',
        margin:'0 !important',
        padding: '1% !important',
      },

      selectFilterBar:{
        width:'90% !important',
        textAlign:'left'
      },

      openCartErrowBox:{
        position:'sticky',
        top: '40%'
      },


     
      
  }
}

);

const cartStyle = makeStyles((theme)=> {
  return {
    cartDiv:{
      padding:'5%',
      textAlign:'left',
    },

    iconContainer: {
      display: 'flex',
    
    },
  }
}

);

const LineItemCartStyle = makeStyles((theme)=> {
  return {
    box:{
        marginTop:'5%',
        padding:'2%',
    }
  }
}

);

export { customerStyle, regStyle, productStyle , cartStyle , LineItemCartStyle};
