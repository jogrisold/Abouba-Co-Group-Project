//**************************************************************** */
// Imports
//**************************************************************** */

// React dependencies
import { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// Local element dependencies
import { StoreContext } from './StoreContext'
import DefaultCircularProgress from './DefaultCircularProgress'

// Icons
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { FcCancel } from 'react-icons/fc'

// Create an element to render products in Homepage
export const ProductCard = ({product}) => {

    //**************************************************************** */
    // Constants
    //**************************************************************** */

    // Use context to get our products via dispatch reducer, companies 
    // and cart data
    const { dispatch, companies, cart } = useContext(StoreContext);
    
    // Define a constant to use Navigate
    const navigate = useNavigate();

    //**************************************************************** */
    // Functions
    //**************************************************************** */

    // Create a function to add single product to cart
    const addToCart = (product) => {
        // Check whether the product is already in the cart
        if (cart[product._id]){
            // Check whether adding the new quantity will exceed the number available
            // If yes, set to max available and log error
            if (cart[product._id].quantity + 1 > product.numInStock){
                product.quantity = product.numInStock;
                console.log("You have exceeded the available limit") //DT - Option to add snackbar notification
            }
            else {
                product.quantity = cart[product._id].quantity + 1
            }
        }
        else {
                product.quantity = 1
            }
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }

    // Function to navigate to product details page associated with that product id
    const handleClickCard = (productId) => {
        navigate(`/product/${productId}`)
    }

    //**************************************************************** */
    // Render
    //**************************************************************** */

    if (product) {
        //Find the company object to render the company name
        const productCompany = companies.find(company => {
            return company._id === product.companyId
            })

        return (
            // Card redirects to product details page
            <Card onClick={()=>{handleClickCard(product._id)}}>
                <Image src={product.imageSrc}/>
                <ContentInformation>
                    <CompanyName>{productCompany.name}</CompanyName>
                    <ProductName>{product.name}</ProductName>
                    <Flex>
                        <TextBold>{product.price}</TextBold>
                        {/* Clicking icon adds product to cart */}
                        {product.numInStock === 0
                        ? 
                        <OutofStock>
                            <FcCancel size = {40}/>
                        </OutofStock>
                        :
                        <Cart onClick={(e)=>{
                            e.stopPropagation();
                            addToCart(product)}}
                        >
                            <AiOutlineShoppingCart size = {40}/>
                        </Cart>
                        }
                    </Flex>
                </ContentInformation>
            </Card>
        )

    // Otherwise, render loading circle
    } else {
        return <DefaultCircularProgress/>
    }
}

//**************************************************************** */
// Styled-Components
//**************************************************************** */

const Card = styled.div`
    border: 1px solid rgba(120, 120, 120, 0.3);
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
    transition: ease-in-out 200ms;
    &:hover {
        transform: scale(1.03);
    }
`;
const ContentInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    border-top: 1px solid rgba(120, 120, 120, 0.3);
    padding: 8px 16px;
    gap: 8px;
`;
const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`;
const Image = styled.img`
    width: 200px; 
    max-height: 250px;
    margin: 15px 0;
`;
const ProductName = styled.div`
    font-family: var(--font-body);
`;
const CompanyName = styled.div`
    width: 100%;
    margin: 5px 0;
    font-family: var(--font-body);
    color: rgba(120, 120, 120, 0.8);
`;
const TextBold = styled.p`
    font-family: var(--font-body);
    font-weight: 700;
`;
const Cart = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    transition: all .2s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
    &:active{
        background-color: lightblue;
    }
`;
const OutofStock = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
`;