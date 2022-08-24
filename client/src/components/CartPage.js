//**************************************************************** */
// Imports
//**************************************************************** */

// React  basics
import styled from "styled-components";
import { useContext } from "react";
import { Link } from "react-router-dom";

// React Icons for display in the slider element
import { BsTrash, BsCartX } from "react-icons/bs";

// Local Dependencies and Elements
import { StoreContext } from "./StoreContext";
import { UserContext} from "./UserContext";
import LinkHomepage from "./LinkHomepage";
import ShippingBilling from "./ShippingBilling";


// Element that will contain the items user has added to cart
const CartPage = () => {

    //**************************************************************** */
    // Constants
    //**************************************************************** */

    // Use context to access the items added to cart and dispatch,
    // which contains our product information via a reducer function
    const { cart, dispatch } = useContext(StoreContext);
    
    // Use UserContext to provide the variable that shows if a user is 
    // logged in yet, to render the page appropriately (for our purposes
    // we will not have a gues checkout, so the user must login or sign up)
    const { isLoggedIn } = useContext(UserContext);
    
    // Initialize a variable for the total price of the user's purchases, which 
    // will be updated 
    let totalPrice = 0;   

    //**************************************************************** */
    // Functions
    //**************************************************************** */

    // First we need a function that will update the number of items in the
    // cart if a user selects to increase or decrease the amount to purchase
    const handleUpdateCart = (e, product) => {
        product.quantity = parseInt(e.target.value)
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }

    // Create a Function to deal with deletion of items from cart
    const handleClickDelete = (productId) => {
        dispatch({type: 'delete-from-cart', id: productId})
    }

    //**************************************************************** */
    // Render
    //**************************************************************** */
    return (
        <Center>
            <Wrapper>
                <LinkHomepage/>
                <Header>Cart</Header>
                <SubHeader>Items</SubHeader>
                {/* If the cart object is populated, then render a list of items in the cart */}
                {Object.values(cart).length > 0 ?
                    <ul>
                        {Object.values(cart).map(element => {
                            // Add product price multiplied by the number of products
                            // to thetotal price, using parseFloat for cents and slicing the dollar sign
                            // in order to display a total price that is the combination of the cost of 
                            // all products multiplied by their quantity
                            totalPrice += parseFloat(element.price.slice(1) * element.quantity)
                            return (
                                <ItemRow>   
                                    {/* Provide a link to the product in case the user wishes to review it before purchase */}
                                    <ProductName to={`/product/${element._id}`}>{element.name}</ProductName>
                                    <Pricing>
                                        <Image src={element.imageSrc}/>
                                        <Text>{element.price} </Text><Text>x</Text> 
                                    <AdjustAmount>
                                        {/* Add a selector that will allow the user to adjust the quantity of the product, and call 
                                        the handleUpdateCart when the value is changed */}
                                        <QuantitySelect 
                                            type='number' 
                                            id='quantity' 
                                            name='quantity' 
                                            defaultValue={element.quantity} 
                                            min='1' 
                                            max={element.numInStock} 
                                            onChange={(e)=>{handleUpdateCart(e, element)}}/>
                                        {/* Add a button that will call the handleClickDelete, which will remove the item from cart */}
                                        <DeleteButton 
                                            onClick={()=>{handleClickDelete(element._id)}}>
                                            <BsTrash/>
                                        </DeleteButton>
                                    </AdjustAmount>
                                    <Text>${(element.price.slice(1) * element.quantity).toFixed(2)}</Text>
                                    </Pricing>
                                </ItemRow>
                            )
                        })}
                        <Total>Total: ${totalPrice.toFixed(2)}</Total>
                    </ul>  

                // Otherwise, render an empty cart  
                : <FlexContainer>
                    <EmptyCart/>
                    <h3>Your Cart is Empty!</h3>
                    <h3>Please return to <Link to='/' style={{color: 'inherit'}}>homepage</Link> to add to you cart</h3>
                    </FlexContainer>
                }
                {/* If the cart is not empty*/}
                {Object.values(cart).length > 0 &&
                    <div>
                        {/* And theuser is logged in */}
                        {isLoggedIn
                        // Allow the shipping and billing inputs to be displayed
                        ? <ShippingBilling/>
                        // Otherwise, direct the user to login 
                        : <Checkout>To continue to checkout, please <LogIn to={"/login"}>log in</LogIn>.</Checkout>
                        }
                    </div>
                }
            </Wrapper>
        </Center>
    )
}

// Export the component for use in /cart
export default CartPage;

//**************************************************************** */
// Styled Components
//**************************************************************** */
const Center= styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    margin-bottom:100px;
`;
const Wrapper= styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    align-items: left;
    margin: 40px 0;
`;
const ItemRow = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0 0 0 ;
`;
const Image = styled.img`
    width: 50px;
`;
const Checkout = styled.p`
    display: flex;
    justify-content: center;
    height: 45px;
    padding: 10px 20px 10px 20px;
    font-size: 22px;
    border-radius: 5px;
    width: fit-content;
    background-color: lightblue;
`;
const ProductName = styled(Link)`
    color: black;
    margin: 15px 20px 15px 15px;
    font-weight: 700;
    text-decoration: none;
    font-size: 18px;
    max-width: 50%;
    &:hover{
        color: var(--color-tertiary);
    }
`;
const LogIn = styled(Link)`
    text-decoration: none;
    font-weight: 900;
    margin: 0 0 0 5px;
    color: black;
    cursor: pointer;
    &:hover {
        color: var(--color-tertiary)
    }
`;
const Pricing = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 45%;
    font-size: 18px;
`;
const AdjustAmount = styled.div`
    display: flex;
    align-items: center;
`;
const QuantitySelect = styled.input`
    font-size: 1rem;
    padding: 4px;
    text-align: center;
    border: 1px solid var(--color-tertiary);
    border-radius: 5px;
    margin-right: 10px;
`;
const Header = styled.h2`
    text-align: left;
    font-size: 2.5rem;
    padding:  40px 0 15px 12px;
    width: 100%;
`;
const SubHeader = styled.h3`
    text-align: left;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--color-secondary);
    padding: 30px 0 10px;
    margin: 0 25px 0 15px;
`;
const Total = styled.div`
    font-family: var(--font-body);
    font-weight: 600;
    width: 100%;
    margin: 20px 0;
    padding-right: 20px;
    text-align: right;
    font-size: 24px;
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
}
`;
const FlexContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 30vh;
width: 100%;
gap: 30px;
`;
const EmptyCart = styled(BsCartX)`
font-size: 60px;
`;
const Text = styled.div`
    font-size: 20px;
    margin: 20px 0 20px 0 ;
`;