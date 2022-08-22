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
        <Center>
        <Wrapper>
        <Header>Cart</Header>
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
        <Total>Total: ${totalPrice}</Total>
        <SubHeader>Shipping details</SubHeader>
        <ShippingForm>
            <FlexRow>
                <FlexCol>
                    <Label for='fname'>First name</Label>
                    <Input type='text' id='fname'/>
                </FlexCol>
                <FlexCol>
                    <Label2 for='lname'>Last name</Label2>
                    <Input2 type='text' id='lname' />
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
                    <Label2 for='province'>Province</Label2>
                    <Input2 type='text' id='province'/>
                </FlexCol>
            </FlexRow>
            <Label for='country'>Country</Label>
            <Input type='text' id='country'/>
            
            <BillingDetails>Billing Details</BillingDetails>
            <Label for='credit-card'>Credit Card</Label>
            <CreditCardInput type='number' id='credit-card'/>
            <FlexRow>
                <FlexCol>
                    <Label for='expiry'>Expiry</Label>
                    <FlexRow>
                        <Expiry type="text" name="month" placeholder="MM" maxlength="2" size="2"/>
                        <span></span>
                        <Expiry type="text" name="year" placeholder="YY" maxlength="2" size="2"/>
                    </FlexRow>
                </FlexCol>
                <FlexCol>
                    <Label2 for='CVV'>CVV</Label2>
                    <Input2 type='number' id='CVV'/>
                </FlexCol>
            </FlexRow>
            <LastRow>
                <PurchaseBtn>Purchase</PurchaseBtn>
                <CancelBtn>Cancel</CancelBtn>
            </LastRow>
        </ShippingForm>
        </div>}
        </Wrapper>
        </Center>
        </>
    )
}

const Center= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Wrapper= styled.div`
    display: flex;
    width: 500px;
    margin: 50px;
    flex-direction: column;
    align-items: left;

`;
const Header = styled.h2`
    text-align: left;
    font-size: 2.5rem;
    padding: 20px 0 20px 15px;
    width: 100%;
`;
const SubHeader = styled.h3`
    text-align: left;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 20px 0;
    margin: 0 25px 0 15px;
`;
const BillingDetails = styled.h3`
    text-align: left;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 20px 0;
    width: 97%;
`;
const Total = styled.div`
    font-family: var(--font-body);
    font-weight: 100;
    width: 100%;
    margin: 18px;
`;
const ProductName = styled(Link)`
color: black;
margin: 10px;
`;
const ShippingForm = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 10px;
padding:  0 0 0 5px;
`;
const FlexRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
`;
const LastRow = styled.div`
    width: 100%;
    display: flex;
    margin: 10px 0;
    justify-content: right;
`;

const FlexCol = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 10px 0;
width: 30%;
`;
const Label = styled.label`
    margin: 10px 0;
    font-size: 1rem;

`;
const Label2 = styled.label`
    margin: 10px 0 0 20px;
    font-size: 1rem;
`;

const Input = styled.input`
    width: ${
    (props=>(props.id === 'CVV' 
    ? '80px'
    : '140px'))};
`;
const Input2 = styled.input`
    width: ${
    (props=>(props.id === 'CVV' 
    ? '80px'
    : '140px'))};
    margin: 10px 0 0 20px;
`;
const Expiry = styled.input`
    width: ${
    (props=>(props.id === 'CVV' 
    ? '80px'
    : '140px'))};
    text-align: center;
`;
const CreditCardInput = styled.input`
    width: 300px;
`;
const PurchaseBtn = styled.button`
    background-color: var(--color-secondary);
    color: white;
    margin-right: 30px;
    `;
const CancelBtn = styled.button`
    background-color: #BF9663;
    color: white;

`;
export default CartPage;