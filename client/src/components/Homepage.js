import styled from "styled-components"

import { ProductCard } from "./ProductCard"
import { Header } from "./Header"
import { Carousel } from "./Carousel"
import Sidebar from "./SideBar";

export const Homepage = () =>{
    return (
        <>
        <PageWrapper>
            <Header />
            <StoreWrapper>
                <Sidebar />
                <FlexColumn>
                    <Carousel />
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
    border: 1px solid red;
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