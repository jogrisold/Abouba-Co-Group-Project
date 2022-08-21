import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'

const ItemDetails = () => {
    const [product, setProduct] = useState(null);
    const [company, setCompany] = useState(null);
    const productId = useParams();
    const id = parseInt(productId.productId);


    //fetch for individual product
    useEffect(()=>{
        fetch(`/api/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setProduct(data.data)
            // second fetch to get company by id, uses data returned from previous fetch
            // to access the companyId needed for url param
            fetch(`/api/companies/${data.data.companyId}`)
            .then((res)=>res.json())
            .then((data)=>{
                setCompany(data.data)
            })
        })
    }, [])

    const handleCartSubmit = (e) =>{
        e.preventDefault();
    }


    if (product && company) {
        return (
            <Wrapper>
                <HomeLink to='/'><MdOutlineArrowBackIosNew/>Go back to Homepage</HomeLink>
                <Content>
                    <Image src={product.imageSrc}/>
                    <FlexCol>
                        <ProductName>{product.name}</ProductName>
                        <ProductInformation>{product.category} // {product.body_location}</ProductInformation>
                        <div>{product.price}</div>
                        <div>{company.name}</div>
                        <UpdateCart>
                            <QuantitySelect type='number' id='quantity' name='quantity' min='1' max={product.numInStock}/>
                            <AddCart>Add to Cart</AddCart>
                        </UpdateCart>
                    </FlexCol>
                </Content>
            </Wrapper>

        )
    } else {
        return (
            <div>loading</div>
        )
    }
}

export default ItemDetails;



const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
const Image = styled.img`
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
border: 1px solid red;
height: 100%;
width: 400px;
padding: 8px 0;
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