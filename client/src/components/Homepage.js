import styled from "styled-components"
import { useContext } from "react"
import { ProductCard } from "./ProductCard"
import { Header } from "./Header"
import { Carousel } from "./Carousel"
import Sidebar from "./SideBar";
import Typeahead from "./TypeAhead";
import { StoreContext } from './StoreContext';
import { Navigate, useNavigate } from 'react-router-dom';

export const Homepage = () =>{
    const navigate = useNavigate();
    const {products} = useContext(StoreContext);

    return (
        <>
        <PageWrapper>
            <Header />
            <StoreWrapper>
                <Sidebar />
                <FlexColumn>
                    <Carousel />
                    <Typeahead
                        suggestion = {products}
                        handleSelect = { (element) =>{
                            console.log(element)
                        }
                        }/>
                    <Store>
                     {/* To do: map through all products from backend */}
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </Store>
                </FlexColumn>
            </StoreWrapper>
        </PageWrapper>
        </>
    )
};

const PageWrapper = styled.div`
    display: flex; 
    flex-direction: column; 
    border: 1px solid var(--color-quarternary);
`;
const StoreWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Store= styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--color-quarternary);
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column; 
    font-family: var(--font-body);
    font-size: 22px;
    margin: 5px 0 5px 0;
    align-items: center;
`;