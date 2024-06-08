import { combineReducers } from 'redux';

const initialState = {
      users:[],
      orders:[],
      categories:[],
      products:[],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOADUSERS': {
      return { ...state, users: action.payload };
    }

    case 'LOAD_ORDERS': {
      return { ...state, orders: action.payload };
    }

    case 'LOAD_CATEGORIES': {
      return { ...state, categories: action.payload };
    }

    case 'LOAD_PRODUCTS': {
       // Sort the products by 'titel' in alphabetical order
      const sortedProducts = action.payload.sort((a, b) => {
        const titleA = a.titel ? a.titel.toLowerCase() : '';
        const titleB = b.titel ? b.titel.toLowerCase() : '';
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      return { ...state, products: sortedProducts };
    }

    default:
      return state;
  }
};

const customerInitialState = {
  cartProduct:[]
};

// Reducer for handling customer cart state only
const customerCartReducer = (state =customerInitialState, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS_TO_CARTS': {
      return { ...state, cartProduct: action.payload };
    }
    
    default:
      return state;
  }
};

// Combine all reducers into rootReducer
const rootReducer = combineReducers({
  data: counterReducer, // Main reducer handling general data
  customerCart: customerCartReducer, // Reducer handling customer cart state
});

export default rootReducer;