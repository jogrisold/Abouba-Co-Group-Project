import { createContext, useEffect, useReducer } from "react";

export const StoreContext = createContext(null);

const initialState = {
    products: [],
    companies: [],
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
        } default:
        throw new Error('ERROR')
    }; 
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        fetch('/api/companies')
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
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
        <StoreContext.Provider value={{...state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}