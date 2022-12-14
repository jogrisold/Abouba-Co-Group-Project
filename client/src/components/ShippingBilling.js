import styled from "styled-components";
import { Link } from "react-router-dom";
import { StoreContext } from "./StoreContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


const ShippingBilling = () => {
    const [purchaseError, setPurchaseError] = useState(null);
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {cart, dispatch} = useContext(StoreContext)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        dispatch({type: 'clear-cart'})
        e.preventDefault();
        if (cart) {
            const form = new FormData(document.forms.shipDetailsForm)
            const cartArray = Object.values(cart).map(element=>{
                return {
                    _id: element._id,
                    name: element.name,
                    price: element.price,
                    body_location: element.body_location,
                    category: element.category,
                    quantity: element.quantity
                }
            })
            const formObj = {
                    email: form.get('email'),
                    shippingInformation : 
                    {
                    firstName: form.get('fname'),
                    lastName: form.get('lname'),
                    city: form.get('city'),
                    province: form.get('province'),
                    country: form.get('country'),
                    },
                    products: cartArray,
                    purchaseDate: Date()
            }
            fetch('/api/users/purchase', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(formObj)
            }).then((res)=>{
                if (res.status >= 400) {
                    throw new Error('There was an error purchasing your items, please try again')
                }
                return res.json()
            }).then((data)=>{
                navigate("/confirmation");
                setUserInfo(data.data.userInfo)

            }).catch((err)=> {
                console.log(err.message)
            })
        } else {
            return
        }
    }
    return (

        <Wrapper>
        <SubHeader>Shipping details</SubHeader>
            <ShippingForm onSubmit={(e)=>{handleSubmit(e)}} id="shipDetailsForm">
                <FlexRow>
                    <FlexCol>
                        <Label for='fname'>First name</Label>
                        <Input type='text' id='fname' name='fname'/>
                    </FlexCol>
                    <FlexCol>
                        <Label2 for='lname'>Last name</Label2>
                        <Input2 type='text' id='lname' name='lname'/>
                    </FlexCol>
                </FlexRow>
                    <Label for='email'>Email</Label>
                    <Input type='email' id='email' name='email'/>
                <FlexRow>
                    <FlexCol>
                        <Label for='city'>City</Label>
                        <Input type='text' id='city' name='city'/>
                    </FlexCol>
                    <FlexCol>
                        <Label2 for='province'>Province</Label2>
                        <Input2 type='text' id='province' name='province'/>
                    </FlexCol>
                </FlexRow>
                <Label for='country'>Country</Label>
                <Input type='text' id='country' name='country'/>
                
                <BillingDetails>Billing Details</BillingDetails>
                <CreditCard for='credit-card'>Credit Card</CreditCard>
                <CreditCardInput type='text' id='credit-card' name='credit-card'/>
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
                        <Input2 type='text' id='CVV' name='CVV'/>
                    </FlexCol>
                </FlexRow>
                <LastRow>
                    <CancelBtn type="reset">Cancel</CancelBtn>
                    <PurchaseBtn type="submit" value="submit">Purchase</PurchaseBtn>
                </LastRow>
            </ShippingForm>
            </Wrapper>

    )
}

// Export the component for use in Cart
export default ShippingBilling;


const Wrapper= styled.div`
    display: flex;
    width: 100%;
    margin-top: 30px;
    flex-direction: column;
    align-items: left;

`;
const SubHeader = styled.h3`
    text-align: left;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 30px 0 15px;
    margin: 0 25px 0 15px;
`;
const BillingDetails = styled.h3`
    text-align: left;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 50px 0 15px;
    width: 100%;
`;
const ShippingForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    padding:  0 0 0 5px;
`;

const LastRow = styled.div`
    width: 100%;
    display: flex;
    margin: 10px -15px;
    justify-content: right;
`;

const CreditCard= styled.label`
    margin: 30px 0 10px 0;
    font-size: 1.5em;
`;
const Label = styled.label`
    margin: 10px 0;
    font-size: 1.5em;
`;
const Label2 = styled.label`
    margin: 10px 0 0 20px;
    font-size: 1.5em;
`;

const Input = styled.input`
    width: ${
    (props=>(props.id === 'CVV' 
    ? '80px'
    : '140px'))};
    height: 20px;
`;
const Input2 = styled.input`
    width: ${
    (props=>(props.id === 'CVV' 
    ? '80px'
    : '140px'))};
    margin: 10px 0 0 20px;
    height: 20px;
`;
const Expiry = styled.input`
    width: 80px;
    height: 20px;
`;
const CreditCardInput = styled.input`
    width: 400px;
    height: 20px;
`;
const PurchaseBtn = styled.button`
    background-color: var(--color-secondary);
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    margin: 30px 0 0 30px;
    font-size: 1.5em;
    width: 135px;
    height: 45px;
    cursor: pointer;
    transition: ease-in-out 100ms;
    &:hover{
        background-color: var(--color-gold);
    }
    `;
const CancelBtn = styled.button`
    background-color: var(--color-primary);
    border: none;
    border-radius: 5px;
    margin: 30px 0 0 30px;
    padding: 5px;
    width: 100px;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
    transition: ease-in-out 100ms;
    &:hover{
        background-color: var(--color-quarternary);
    }

`;
const FlexRow = styled.div`
    width: 1000px;
    display: flex;
    justify-content: left;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    width: 30%;
`;