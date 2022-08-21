import { createContext, useEffect, useReducer, useState } from "react";

export const StoreContext = createContext(null);


const initialState = {
    products: [],
    companies: [],
    cart: ["test"]
};

const reducer = (state, action) =>{
    switch(action.type) {
        case 'store-product-data': {
            return {
                ...state,
                products: action.products
            }
        } case 'store-company-data': {
            return {
                ...state,
                companies: action.companies
            }
        } case 'add-to-cart' : {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.key]: action.product
                }        
            }
        } default:
        throw new Error('ERROR')
    }; 
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedItem, setSelectedItem] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);
    const [item, setItem] = useState(null);
    const [givenName, setGivenName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        fetch('/api/companies')
        .then((res)=>res.json())
        .then((data)=>{
            dispatch({type: 'store-company-data', companies: data.data})
        })
    }, [])

    useEffect(()=>{
        fetch('/api/products')
        .then((res)=>res.json())
        .then((data)=>{
            dispatch({type: 'store-product-data', products: data.data})
        })
    }, [])

    return (
        <StoreContext.Provider value={{
            ...state, 
            dispatch,
            selectedItem, 
            setSelectedItem,
            currentUserId,
            setCurrentUserId,
            item,
            setItem,
            givenName,
            setGivenName,
            surname,
            setSurname,
            email,
            setEmail
            }}>
            {children}
        </StoreContext.Provider>
    )
}