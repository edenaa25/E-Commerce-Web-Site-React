import { makeStyles } from "@material-ui/core/styles";

const statisticsPage = makeStyles((theme) =>{
  return{
    dashboardCard:{
      // padding:'3%',
      backgroundColor: '#DCDCDC',
      width:'60%',
      margin:'auto',

    },

    paiChartDiv:{
      backgroundColor:'#DCDCDC',
      
    },

    barChartDiv:{
      textAlign: "left",
      paddingLeft: "20px" ,
      backgroundColor:'#DCDCDC',
    }

  }

})

const categoriesPage = makeStyles((theme) =>{
  return{
   categoriesContainer: {
    backgroundColor: "#E3E3E3",
    borderRadius: "7px",
    // padding: "3%",
    textAlign: "left",
    color: "black !important",
    // margin:"auto",
    margin:'5%',
    padding:'3%'

  },

  categoriesContainerGrid: {
    
    boxShadow: ' 0px 7px 30px 0px #DEDEDE',
    borderRadius: "7px",
    // border: '1px solid',

    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    // marginBottom: theme.spacing(2), // Add margin bottom for spacing between categories
    // maxWidth: "100%", // Ensure the container doesn't exceed parent's width
    // flexWrap: "wrap", // Allow items to wrap onto the next line if needed

    
  },

  categoriesItemGrid: {
    padding: '3% important!'
  },

  categoryTextField: {
    width: "70%", // Full width
  },

  categoryButton: {
    backgroundColor: "#DAD7D7 !important",
    color:"black !important",
    margin:'5px 0 5px 0 !important'
  },

  addButton: {
    backgroundColor: "#6EAF49 !important",
    color:"black !important"
  },

  }

})

const productsPage = makeStyles((theme) =>{
  return{
    productDiv:{
      textAlign:'left',
      padding:'5%',
      paddingTop:0,
      margin:'0 auto ',
      textlign: 'center',
      width:'80%',
    },

    productsCard: {
      
      // textAlign:'left',
      boxShadow: '4',
      margin:'3% auto',
      backgroundColor: '#F1F1F1',
      
    },

    productsButton:{
        backgroundColor: '#6DC25B',
        color: '#FFFFFF',
    },

    productButton:{
      backgroundColor: '#6EAF49 !important',
      margin:'1% !important'
      
  },
    formLabelProduct:{
        fontWeight:'bold !important',
        color:'black !important',
      },

    selectProduct:{
      '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
        width:'150px',
      
      }},

    descriptionProduct:{
      // height: '300px',
      overflow: 'auto'
      // resize: 'both',
    }

  }

})

const adminPage = makeStyles((theme) => {
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
      // padding: "0px",
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

export { adminPage , statisticsPage , categoriesPage , productsPage};
