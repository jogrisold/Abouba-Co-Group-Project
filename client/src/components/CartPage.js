import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { useContext } from "react";
import Header from "./Header";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cart, products, companies } = useContext(StoreContext);
    let totalPrice = 0;    
    return (
        <>
        <Header/>
        <h2>Cart</h2>
        <SubHeader>Items</SubHeader>
        {cart &&
        <div>
        {Object.values(cart).map(element => {
            // add product price to total price, using parseFloat for cents and slicing the dollar sign
            totalPrice += parseFloat(element.price.slice(1))
            return (
                <>
                <ProductName to={`/product/${element._id}`}>{element.name}</ProductName>
                <p>{element.price}</p>
                <BsTrash/>
                </>
            )
        })}
        <p>Total: ${totalPrice}</p>
        <SubHeader>Shipping details</SubHeader>
        <ShippingForm>
            <Label for='fname'>First name</Label>
            <Input type='text'/>
            <Label for='lname'>Last name</Label>
            <Input type='text'/>
            <Label for='email'>Email</Label>
            <Input type='email'/>
            <Label for='city'>City</Label>
            <Input type='text'/>
            <Label for='province'>Province</Label>
            <Input type='text'/>
            <Label for='country'>Country</Label>
            <Input type='text'/>
            <SubHeader>Billing Details</SubHeader>
            <Label for='credit-card'>Credit Card</Label>
        </ShippingForm>
        </div>}
        </>
    )
}
const SubHeader = styled.h3`
font-size: 1.5rem;
display: flex;
border-bottom: 1px solid var(--color-secondary);
padding: 8px 0;
`

const ProductName = styled(Link)`
color: black;
`

const ShippingForm = styled.form`
`

const Label = styled.label``

const Input = styled.input``
export default CartPage;
