import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { UserContext} from "./UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import { BsTrash, BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import LinkHomepage from "./LinkHomepage";
import ShippingBilling from "./ShippingBilling";

const CartPage = () => {
    const { cart, products, companies, dispatch } = useContext(StoreContext);
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleClickDelete = (productId) => {
        dispatch({type: 'delete-from-cart', id: productId})
    }

    const handleUpdateCart = (e, product) => {
        product.quantity = parseInt(e.target.value)
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }
    let totalPrice = 0;    
    return (
        <>
        <LinkHomepage/>
        <Center>
            <Wrapper>
                <Header>Cart</Header>
                <SubHeader>Items</SubHeader>
                {Object.values(cart).length > 0 ?
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
                                    <AdjustAmount>
                                        <QuantitySelect type='number' id='quantity' name='quantity' defaultValue={element.quantity} min='1' max={element.numInStock} 
                                        onChange={(e)=>{handleUpdateCart(e, element)}}/>
                                        <DeleteButton onClick={()=>{handleClickDelete(element._id)}}><BsTrash/></DeleteButton>
                                    </AdjustAmount>
                                    <p>${(element.price.slice(1) * element.quantity).toFixed(2)}</p>
                                    </Pricing>
                                </ItemRow>
                            )
                        })}
                        <Total>Total: ${totalPrice.toFixed(2)}</Total>
                    </ul>   
                    :
                    <FlexContainer>
                        <EmptyCart/>
                        <h3>Your Cart is Empty!</h3>
                        <h3>Please return to <Link to='/' style={{color: 'inherit'}}>homepage</Link> to add to you cart</h3>
                    </FlexContainer>
                }
                    {Object.values(cart).length > 0 &&
                        <div>
                            {isLoggedIn
                            ?
                                <ShippingBilling/>
                            : 
                                <Checkout>To continue your checkout, please <LogIn to={"/login"}>log in</LogIn>.</Checkout>
                            }
                        </div>
                    }
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
const Checkout = styled.p`
    height: 40px;
    padding: 12px 20px 10px;
    border-radius: 5px;
    width: fit-content;
    background-color: lightblue;
`
const LogIn = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    color: black;
    cursor: pointer;
    &:hover {
        color: var(--color-tertiary)
    }
`
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
    height: 100vh;
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

const DeleteButton = styled.button`
display: flex;
align-items: center;
background-color: #fff;
border: none;
cursor: pointer;
transition: ease-in-out 50ms;

&:hover {
    transform: scale(1.1)
}`

const FlexContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 30vh;
width: 100%;
gap: 30px;
`

const EmptyCart = styled(BsCartX)`
font-size: 60px;`

export default CartPage;