
import { Swiper, SwiperSlide } from 'swiper/'
import styled from 'styled-components'

import { useContext } from 'react'
import { StoreContext } from './StoreContext'
import { ProductCard } from './ProductCard'
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";

export const Carousel = () => {
    const { products, companies } = useContext(StoreContext)
    
    // To do: fetch the next carousel item from backend
    const clickLeft = () =>{
        
    };
    // To do: fetch the previous carousel item from backend
    const clickRight = () =>{

    };
    return (
    <Wrapper>
    <FlexRow>
        <Left
            onClick ={clickLeft}>
            <BsArrowLeftCircle size = {40}/>
        </Left>
        <ProductCard/>
        <Right
            onClick = {clickRight}>
            <BsArrowRightCircle size = {40}/>

        </Right>
    </FlexRow>
    </Wrapper>
    )
};

const Wrapper = styled.div` 
    justify-content: center;
    align-items: center;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Left = styled.button`
    border: none;
    background-color: white;
`;
const Right = styled.button`
    border: none;
    background-color: white;
`;
