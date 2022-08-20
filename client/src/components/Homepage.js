import styled from "styled-components"

import { ProductCard } from "./ProductCard"
import { Header } from "./Header"
import Sidebar from "./SideBar";

export const Homepage = () =>{
    return (
        <>
        <PageWrapper>
            <Header />
            <StoreWrapper>
                <Sidebar />
                <Store>
                    <ProductCard/>
                </Store>
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
    /* display: grid; */
    grid-template-columns: (1fr, 3fr);
    border: 1px solid var(--color-quarternary);
`;
const Store= styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border: 1px solid var(--color-quarternary);
`;