//**************************************************************** */
// Imports
//**************************************************************** */

// React essentials
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";

// Local elements and dependencies
import { StoreContext } from "./StoreContext";
import { Drop } from "./LinkHomepage";
import DefaultCircularProgress from "./DefaultCircularProgress"
import LinkHomepage from "./LinkHomepage";

// Icon
import {MdKeyboardArrowRight} from 'react-icons/md'

const ItemDetails = () => {
    //**************************************************************** */
    // Constants
    //**************************************************************** */

    // State for the selected product to be rendered
    const [product, setProduct] = useState(null);
    // Same for the company associated with the product
    const [company, setCompany] = useState(null);
    // Create a state for the quantity of the item to be purchased
    const [quantity, setQuantity] = useState(1);
    // Use params to retrieve the product ID
    const productId = useParams();
    // Convert it to an integer that can be parsed
    const id = parseInt(productId.productId);
    // Use context to bring in our products and companies
    // via the reducer
    const { dispatch, cart } = useContext(StoreContext);


    //**************************************************************** */
    // Functions
    //**************************************************************** */

    //Add single or multiple products to cart
    const addToCart = (product) => {

        // Check whether the product is already in the cart
        if (cart[product._id]){

            // Check whether adding the new quantity will exceed the number available
            // If yes, set to max available and log error
            if (cart[product._id].quantity + +quantity > product.numInStock){
                product.quantity = product.numInStock;
                console.log("You have exceeded the available limit") //DT - Option to add snackbar notification
            }
            // Else, add new quantity to existing quantity
            else {
                product.quantity = cart[product._id].quantity + +quantity
            }
        }

        // If the product is not yet in the cart, add a new quantity key with the amount specified
        else {
                product.quantity = +quantity
        }
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }

    //fetch for individual product
    useEffect(()=>{
        fetch(`/api/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setProduct(data.data)
            // second fetch to get company by id, uses data returned from previous fetch
            // to access the companyId needed for url param
            fetch(`/api/companies/${data.data.companyId}`)
            .then((res)=>res.json())
            .then((data)=>{
                setCompany(data.data)
            })
        })
    }, [productId.productId])

    // Validate that quantity is greater than 0
    const handleCartSubmit = (e) =>{
        e.preventDefault();
        if (quantity > 0){
            addToCart(product)
        }
    }

    // If the data from reducer has loaded
    if (product && company) {
        // Render the Item Details
        return (
        <Wrapper>
            <LinkHomepage/>
            <Content>
                <Image src={product.imageSrc}/>
                <FlexCol>
                    <TitleDetails>
                        <ProductName>{product.name}</ProductName>
                        <ProductInformation>{product.category} <Drop><MdKeyboardArrowRight/></Drop> {product.body_location}</ProductInformation>
                        <CompanyName href={company.url}>{company.name}</CompanyName>
                    </TitleDetails>
                    <CartDetails>
                    <Price>{product.price}</Price>
                    {product.numInStock === 0
                    ?   <UpdateCart>
                            <OutofStockBtn disabled={true}>Out of stock</OutofStockBtn>
                        </UpdateCart>
                    :   <>
                        <UpdateCart onSubmit={(e)=> {handleCartSubmit(e, product)}}>
                            <QuantitySelect onChange={(e)=> {setQuantity(e.target.value)}} type='number' id='quantity' name='quantity' value={quantity} min='1' max={product.numInStock}/>
                            <AddCart type="submit">Add to Cart</AddCart>
                        </UpdateCart>
                        {product.numInStock < 5 &&
                            <Hurry>Hurry, only {product.numInStock} left!</Hurry>
                        }
                        </>
                    }
                    </CartDetails>
                </FlexCol>
            </Content>
        </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <DefaultCircularProgress/>
            </Wrapper>
        )
    }
}

// Export our component 
export default ItemDetails;

//**************************************************************** */
// Styled-Components
//**************************************************************** */

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 36px 0;
    height: 100vh;
`
const Image = styled.img`
    width: 350px;
    height: 100%;
    border-radius: 5px;
`
const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 100px;
`
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 400px;
    padding: 8px 50px;
    gap: 8px;`

const TitleDetails = styled.div`
`;
const CartDetails = styled.div`
`;
const ProductName = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 15px;
`;
const QuantitySelect = styled.input`
    font-size: 1.25rem;
    padding: 8px;
    text-align: center;
    border: 2px solid var(--color-tertiary);
    border-radius: 5px;
`;
const UpdateCart = styled.form`
    display: flex;
    align-items: center;
    height: 30px;
    gap: 8px;
`;
const OutofStockBtn = styled.button`
    background: var(--color-primary);
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 6px;
`;
const Hurry = styled.p`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding-top: 14px;
    
`;
const AddCart = styled.button`
    background: var(--color-secondary);
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 6px;
    margin-left: 0.8rem;
    cursor: pointer;
    transition: ease-in-out 100ms;
    &:hover{
        background-color: var(--color-gold);
    }
    &:active{
        transform: scale(.8);
    }
`;
const Price = styled.p`
    font-size: 22px;
    margin-bottom: 50px;
`;
const ProductInformation = styled.p`
    margin-bottom: 10px;
`;
const CompanyName = styled.a`
    text-decoration: none;
    color: var(--color-tertiary);
    font-weight: bold;
    font-size: 18px;
    transition: ease-in-out 100ms;
    &:hover {
        color: var(--color-primary);
    }
`;