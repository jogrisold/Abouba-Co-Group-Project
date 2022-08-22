import styled from "styled-components"
import { useContext } from "react"
import { ProductCard } from "./ProductCard"
import { Carousel } from "./Carousel"
import Sidebar from "./SideBar";
import Typeahead from "./TypeAhead";
import { StoreContext } from './StoreContext';
import DefaultCircularProgress from "./DefaultCircularProgress";

const Homepage = () =>{

    const {products} = useContext(StoreContext);

    return (
        <>
            <StoreWrapper>
                <SideBarDiv>
                    <Sidebar />
                </SideBarDiv>
                {
                products &&
                    <FlexColumn>
                        <Carousel />
                        {/* DT - What is this handleSelect doing? */}
                        <Typeahead
                            suggestion = {products}
                            handleSelect = { (element) =>{
                                console.log(element)
                            }}
                        />
                        <Store>
                            {/* Map through products to render cards */}
                            {
                                products.map(product => {
                                    return (
                                        <ProductCard key={product._id} product={product}/>
                                    )
                                })
                            }
                        </Store>
                    </FlexColumn>
                }
                {/* Render loading circle */}
                {
                    !products &&
                        <DefaultCircularProgress/>
                }
            </StoreWrapper>
        </>
    )
};

const StoreWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const SideBarDiv = styled.div`
    position: absolute;
    top: 200;
    left: 0;
`
const Store = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 0 40px 0 250px;
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column; 
    font-family: var(--font-body);
    font-size: 18px;
    margin: 40px 0 5px 200px;
    align-items: center;
`;

export default Homepage;