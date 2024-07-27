import { createContext, useReducer, useContext } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
    user: null,
    role: '',
    cart: [],
    products: [],
};

const appReducer = (state, action) => {
    switch (action.type){
        case 'SET_USER': 
            return {...state, user: action.payload};
        case 'ADD_TO_CART':
            return {...state, cart: [...state.cart, action.payload]};
        case 'SET_PRODUCTS': 
            return {...state, products: action.payload};
        default: 
            return false;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                { children }
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);