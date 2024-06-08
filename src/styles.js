import { makeStyles } from '@material-ui/core/styles';

//App page
const appPage = makeStyles((theme)=> {
    return {
        root: {
            backgroundColor: '#DCDCDC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
            minHeight: '100vh',
            flexDirection: 'column', // Align children in a column
            padding:0,
        },
       
    }
}

);

//Login page
const loginStyle = makeStyles((theme)=> {
    return {
        Container: {
          
            boxShadow: '5px 5px 5px 5px #888888' ,
            height: '40%',
            padding:'3%',

          
            
        },
        textField: {          
            width: '100%', // Full width
            '& .MuiInputBase-root': {
                height: '30px', // Adjust height as needed
            },
            '& .MuiInputBase-input': {
                padding: '0 2px 0 2px',
            },

               
        },
    }
}

);

//Register Page 
const regStyle = makeStyles((theme)=> {
    return {
        RegContainer:{
            backgroundColor: 'White',
            margin:"5%",
            padding: theme.spacing(3), 

        },
        gridContainer: {
            padding: theme.spacing(2), // Add padding to the grid container

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

export  {loginStyle,regStyle,appPage};