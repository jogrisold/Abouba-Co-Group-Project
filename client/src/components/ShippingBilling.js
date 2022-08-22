import styled from "styled-components";
import { Link } from "react-router-dom";


const ShippingBilling = () => {
    return (<>
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
                <CreditCardInput type='text' id='credit-card'/>
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
                        <Input2 type='text' id='CVV'/>
                    </FlexCol>
                </FlexRow>
                <LastRow>
                    <CancelBtn>Cancel</CancelBtn>
                    <PurchaseBtn>Purchase</PurchaseBtn>
                </LastRow>
            </ShippingForm>
    </>)
}

const SubHeader = styled.h3`
    text-align: left;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 30px 0 10px;
    margin: 0 25px 0 15px;
`;
const BillingDetails = styled.h3`
    text-align: left;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 30px 0 10px;
    width: 97%;
`;
const Total = styled.div`
    font-family: var(--font-body);
    font-weight: 100;
    width: 100%;
    margin: 18px;
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
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    margin-left: 30px;
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
    color: white;
    cursor: pointer;
    transition: ease-in-out 100ms;
    &:hover{
        background-color: var(--color-quarternary);
    }

`;
export default ShippingBilling;