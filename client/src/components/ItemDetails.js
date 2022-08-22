import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "./StoreContext";
import { useParams, Link } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import DefaultCircularProgress from "./DefaultCircularProgress"

const ItemDetails = () => {
    const [product, setProduct] = useState(null);
    const [company, setCompany] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const productId = useParams();
    const id = parseInt(productId.productId);

    const { dispatch, cart } = useContext(StoreContext);


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
    }, [id])

    // Validate that quantity is greater than 0
    const handleCartSubmit = (e) =>{
        e.preventDefault();
        if (quantity > 0){
            addToCart(product)
        }
    }


    if (product && company) {
        return (
            <>
      
            <Wrapper>
            <div style={{width: '100%'}}>
            <HomeLink to='/'><MdOutlineArrowBackIosNew/>Homepage</HomeLink>
            </div>
               
                <Content>
                    <Image src={product.imageSrc}/>
                    <FlexCol>
                        <ProductName>{product.name}</ProductName>
                        <ProductInformation>{product.category} // {product.body_location}</ProductInformation>
                        <div>{product.price}</div>
                        <div>{company.name}</div>
                        <UpdateCart onSubmit={(e)=> {handleCartSubmit(e, product)}}>
                            <QuantitySelect onChange={(e)=> {setQuantity(e.target.value)}} type='number' id='quantity' name='quantity' value={quantity} min='1' max={product.numInStock}/>
                            <AddCart type="submit">Add to Cart</AddCart>
                        </UpdateCart>
                    </FlexCol>
                </Content>
            </Wrapper>
            </>

        )
    } else {
        return (
            <DefaultCircularProgress/>
        )
    }
}

export default ItemDetails;



const Wrapper = styled.div`
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;
width: 80%;
padding: 36px 0;
`
const Image = styled.img`
width: 190px;
height: 100%;
`
const Content = styled.div`
display: flex;
align-items: center;
gap: 16px;
`
const FlexCol = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
width: 400px;
padding: 8px 4px;
gap: 8px;`

const ProductName = styled.div`
font-size: 1.25rem;
font-weight: 700;
`
const HomeLink = styled(Link)`
display: flex;
align-items: center;
color: black;
text-decoration: none;
width: 30%;
padding: 30px 0px;
margin: 0 36px;
`
const QuantitySelect = styled.input`
font-size: 1.25rem;
padding: 2px;
text-align: center;
`
const UpdateCart = styled.form`
display: flex;
align-items: center;
height: 30px;
gap: 8px;`

const AddCart = styled.button`
height: 100%;
font-size: 1rem;
padding: 4px 16px;
background: #fff;
transition: all .03s ease-in-out;

&:hover {
    transform: scale(1.02)
}
cursor: pointer;
`

const ProductInformation = styled.div``

const CompanyName = styled(Link)``