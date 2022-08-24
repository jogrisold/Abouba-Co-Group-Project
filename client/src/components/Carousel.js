// Import swiper and related packages
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation'
import 'swiper/components/pagination'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import '../swiperStyles.css'

// Basic react necessitis
import styled from 'styled-components'
import { useContext } from 'react'
// Context and file dependencies
import { StoreContext } from './StoreContext'
import {useNavigate} from "react-router-dom"

SwiperCore.use([Navigation, Pagination])

// Carousel of images showing a random/special item, 
// To be used on the Homepage
export const Carousel = () => {
    // Use Context to get our product list from Store Context
    const { products } = useContext(StoreContext)
    const navigate = useNavigate();
    let randomIndexArray = [];
    for (let i=0; i <= 14; i++){
        randomIndexArray.push(Math.floor(Math.random() * 346))
    }

    return (
        <>
        {products.length > 0 && 
        <>
        <Featured>Featured Items</Featured>
        <SwiperContainer>
        <Swiper wrapperTag='ul' navigation slidesPerView={3}>
            {randomIndexArray.map((element)=>{
                
                    return (
                        products[element].numInStock > 0 ?
                        <SwiperSlide
                        tag="li"
                        style={{
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'}}
                        >
                            <SwiperImage src={products[element].imageSrc} onClick={()=>{navigate(`/product/${products[element]._id}`)}}/>
                            {products[element].name.length > 24 ?
                            <p>{products[element].name.slice(0, 24)}...</p>
                            :
                            <p>{products[element].name}</p>}
                        </SwiperSlide>
                        :
                        <></>
                    )  
            })}
        </Swiper>
        </SwiperContainer>
        </>
        }
    </>
    )
};

const SwiperContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
max-width: 800px;
padding: 8px;
margin: 0 auto;
`

const Featured = styled.h1`
margin-bottom: 8px;
font-size: 24px;
`

const SwiperImage = styled.img`
margin: 0 auto;

margin-bottom: 8px;
cursor: pointer;

`

