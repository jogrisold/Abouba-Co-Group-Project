import { useContext } from 'react'
import { StoreContext } from './StoreContext'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { ImCheckmark } from 'react-icons/im'



export const ProductCard = () => {
    const { dispatch, products, companies, cart } = useContext(StoreContext);
    const [company, setCompany] = useState('Barska');

    const addToCart = (product) => {
        dispatch({type: 'add-to-cart', key: product._id, product: product})
    }

    // useEffect(()=>{
    //     fetch(`/api/companies/${products[0].companyId}`)
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log(data)
    //         setCompany(data.data)
    //     })
    // }, [])




    if (products.length > 0) {
        const product = products[0]
        return (
            <Card>
            <Image src={product.imageSrc}/>
            <ContentInformation>
                <CompanyName>{company}</CompanyName>
                <ProductName>{product.name}</ProductName>
                <Flex>
                    <TextBold>{product.price}</TextBold>
                    <Cart onClick={()=>{addToCart(product)}}>
                        <AiOutlineShoppingCart/>
                    </Cart>
                </Flex>
            </ContentInformation>
            </Card>
        )

    } else {
        return <div>loading</div>
    }

}

const Card = styled.div`
border: 1px solid rgba(120, 120, 120, 0.3);
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 8px;
border-radius: 8px;
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
`

const ProductName = styled.div`
`

const CompanyName = styled.div`
width: 100%;
color: rgba(120, 120, 120, 0.8);
`

const TextLight = styled.div`
color: rgba(120, 120, 120);
`

const TextBold = styled.div`
font-weight: 700;
`

const Cart = styled.button`
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
border: none;
transition: all .2s ease-in-out;

&:hover {
    transform: scale(1.2);
}

cursor: pointer;
`