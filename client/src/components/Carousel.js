// Import swiper for use in Riku's stretch goal
import { Swiper, SwiperSlide } from 'swiper/'
// Basic react necessitis
import styled from 'styled-components'
import { useContext } from 'react'
// Context and file dependencies
import { StoreContext } from './StoreContext'
import { ProductCard } from './ProductCard'
// React Icons
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";

// Carousel of images showing a random/special item, 
// To be used on the Homepage
export const Carousel = () => {
    // Use Context to get our product list from Store Context
    const { products } = useContext(StoreContext)

    //***********************RIKU******************************** */
    // To do: fetch the next carousel item from backend
    const clickLeft = () =>{
    };
    // To do: fetch the previous carousel item from backend
    const clickRight = () =>{
    };
    //***********************RIKU******************************** */

    // Generate a random number to select a product from the database
    let selectRandomWatch = Math.floor(Math.random() * products.length)

    return (
    <Wrapper>
        <FlexRow>
            <Button
                onClick ={clickLeft}>
                <BsArrowLeftCircle size = {40}/>
            </Button>


            <ProductCard 
            product={products[selectRandomWatch]}/>

            <Button
                onClick = {clickRight}>
                <BsArrowRightCircle size = {40}/>
            </Button>
        </FlexRow>
    </Wrapper>
    )
};

// Align in center
const Wrapper = styled.div` 
    justify-content: center;
    align-items: center;
`;
// Put the elements in a row
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
// Make the buttons display in page nicely
const Button = styled.button`
    border: none;
    background-color: white; 
    margin: 0 15px 0 15px;
`;