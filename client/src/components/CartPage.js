import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { useContext } from "react";
import Header from "./Header";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'

const CartPage = () => {
    const { cart, products, companies } = useContext(StoreContext)
    console.log(cart)
    
    return (
        <>
        <Header/>
        <h2>Cart</h2>
        <SubHeader>Items</SubHeader>
        {cart && cart.length > 0 &&
        Object.values(cart).map(element => {
            console.log(element)
            return (
                <div>{element.name}</div>
            )
        })}
        </>
    )
}
const SubHeader = styled.h3`
font-size: 1.5rem;
`
export default CartPage;
