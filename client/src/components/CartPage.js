import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { useContext } from "react";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cart, products, companies } = useContext(StoreContext);
    let totalPrice = 0;    
    return (
        <>
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
            <FlexRow>
                <FlexCol>
                    <Label for='fname'>First name</Label>
                    <Input type='text' id='fname'/>
                </FlexCol>
                <FlexCol>
                    <Label for='lname'>Last name</Label>
                    <Input type='text' id='lname' />
                </FlexCol>
            </FlexRow>
            <Label for='email'>Email</Label>
            <Input type='email' id='email'/>
            <FlexRow>
                <FlexCol>
                    <Label for='city'>City</Label>
                    <Input type='text' id='city'/>
                </FlexCol>
                <FlexCol>
                    <Label for='province'>Province</Label>
                    <Input type='text' id='province'/>
                </FlexCol>
            </FlexRow>
            <Label for='country'>Country</Label>
            <Input type='text' id='country'/>
            
            <SubHeader>Billing Details</SubHeader>
            <Label for='credit-card'>Credit Card</Label>
            <Input type='number' id='credit-card'/>
            <FlexRow>
                <FlexCol>
                    <Label for='expiry'>Expiry</Label>
                    <Input type='number' id='expiry'/>
                </FlexCol>
                <FlexCol>
                    <Label for='CVV'>CVV</Label>
                    <Input type='number' id='CVV'/>
                </FlexCol>
            </FlexRow>
            <CancelBtn>Cancel</CancelBtn>
            <PurchaseBtn>Purchase</PurchaseBtn>
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
width: 100%;
`

const ProductName = styled(Link)`
color: black;
`

const ShippingForm = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;

`

const FlexRow = styled.div`
display: flex;`

const FlexCol = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
/* display: inline-block; */
width: 30%;
`

const Label = styled.label`
font-size: 1rem;`

const Input = styled.input`
width: ${(props=>(props.id === 'CVV' 
?
'80px'
: '140px'))};

`

const CancelBtn = styled.button`
`

const PurchaseBtn = styled.button`
`
export default CartPage;
