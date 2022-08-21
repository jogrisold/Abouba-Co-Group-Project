import { useContext } from 'react'
import { StoreContext } from './StoreContext'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { ImCheckmark } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import DefaultCircularProgress from './DefaultCircularProgress'


export const ProductCard = ({product}) => {
    const { dispatch, products, companies, cart } = useContext(StoreContext);
    const [company, setCompany] = useState('Barska');
    const navigate = useNavigate();

    const addToCart = (product) => {
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }

    const handleClickCard = (productId) => {
        navigate(`/product/${productId}`)
    }

    // useEffect(()=>{
    //     fetch(`/api/companies/${product.companyId}`)
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log(data)
    //         setCompany(data.data)
    //     })
    // }, [])

    // if (products.length > 0) {
    //     const product = products[0]
  
    if (product) {
        // const product = products[0]

        return (
            <Card onClick={()=>{handleClickCard(product._id)}}>
            <Image src={product.imageSrc}/>
            <ContentInformation>
                <CompanyName>{company}</CompanyName>
                <ProductName>{product.name}</ProductName>
                <Flex>
                    <TextBold>{product.price}</TextBold>
                    <Cart onClick={(e)=>{
                        e.stopPropagation();
                        addToCart(product)}}>
                        <AiOutlineShoppingCart size = {40}/>
                    </Cart>
                </Flex>
            </ContentInformation>
            </Card>
        )

    } else {
        return <DefaultCircularProgress/>
    }
}


const Card = styled.div`
    border: 1px solid rgba(120, 120, 120, 0.3);
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
    transition: ease-in-out 200ms;
    &:hover {
        transform: scale(1.03);
    }
`

const ContentInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    border-top: 1px solid rgba(120, 120, 120, 0.3);
    padding: 8px 16px;
    gap: 8px;
`
const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Image = styled.img`
    width: 200px; 
    margin: 15px 0;
`

const ProductName = styled.div`
    font-family: var(--font-body);
`

const CompanyName = styled.div`
    width: 100%;
    font-family: var(--font-body);
    color: rgba(120, 120, 120, 0.8);
`

const TextLight = styled.div`
    font-family: var(--font-body);
    color: rgba(120, 120, 120);
`

const TextBold = styled.p`
    font-family: var(--font-body);
    font-weight: 700;
`

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
`