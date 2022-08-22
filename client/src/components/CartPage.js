import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { useContext } from "react";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import LinkHomepage from "./LinkHomepage";
import ShippingBilling from "./ShippingBilling";

const CartPage = () => {
    const { cart, products, companies, dispatch } = useContext(StoreContext);
    let totalPrice = 0;    
    return (
        <>
        <LinkHomepage/>
        <Center>
            <Wrapper>
                <Header>Cart</Header>
                <SubHeader>Items</SubHeader>
                {cart &&
                    <ul>
                    {Object.values(cart).map(element => {
                        // add product price to total price, using parseFloat for cents and slicing the dollar sign
                        totalPrice += parseFloat(element.price.slice(1) * element.quantity)
                        return (
                            <ItemRow>
                                <ProductName to={`/product/${element._id}`}>{element.name}</ProductName>
                                <Pricing>
                                    <Image src={element.imageSrc}/>
                                    <p>{element.price} x</p>
                                    {/* <QuantityIndicator>x{element.quantity}</QuantityIndicator> */}
                                <AdjustAmount>
                                    <QuantitySelect type='number' id='quantity' name='quantity' value={element.quantity} min='0' max={element.numInStock}/>
                                    <BsTrash/>
                                </AdjustAmount>
                                <p>${element.price.slice(1) * element.quantity}</p>
                                </Pricing>
                            </ItemRow>
                        )
                    })}
                    <Total>Total: ${totalPrice}</Total>
                    <ShippingBilling/>
                    </ul>}
            </Wrapper>
        </Center>
        </>
    )
}

const ItemRow = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
`
const Image = styled.img`
    width: 50px;
`
// const QuantityIndicator = styled.p`
//     padding-left: 15px;
// `
const Pricing = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 45%;
`
const AdjustAmount = styled.div`
    display: flex;
    align-items: center;
`
const QuantitySelect = styled.input`
font-size: 1rem;
padding: 4px;
text-align: center;
border: 1px solid var(--color-tertiary);
border-radius: 5px;
margin-right: 10px;
`
const Center= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Wrapper= styled.div`
    display: flex;
    width: 700px;
    margin: 50px;
    flex-direction: column;
    align-items: left;

`;
const Header = styled.h2`
    text-align: left;
    font-size: 2.5rem;
    padding:  30px 20px 15px;
    width: 100%;
`;
const SubHeader = styled.h3`
    text-align: left;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 30px 0 10px;
    margin: 0 25px 0 15px;
`;
const Total = styled.div`
    font-family: var(--font-body);
    font-weight: 100;
    width: 100%;
    margin: 20px 0;
    padding-right: 20px;
    text-align: right;
`;
const ProductName = styled(Link)`
    color: black;
    margin: 15px 20px 15px 15px;
    font-weight: bold;
    text-decoration: none;
    max-width: 50%;
    &:hover{
        color: var(--color-tertiary);
    }
`;
export default CartPage;