//**************************************************************** */
// Imports
//**************************************************************** */

// Import react dependencies
import styled from "styled-components"
import { useContext } from "react"

// Local Elements and dependencies
import { ProductCard } from "./ProductCard"
import { Carousel } from "./Carousel"
import Sidebar from "./SideBar";
import { StoreContext } from './StoreContext';
import DefaultCircularProgress from "./DefaultCircularProgress";

// This will be the landing page element
const Homepage = () =>{

    //**************************************************************** */
    // Constants
    //**************************************************************** */

    // Just our products from store context!
    const {products} = useContext(StoreContext);

    //**************************************************************** */
    // Render
    //**************************************************************** */

    return (
        <StoreWrapper>
            <SideBarDiv>
                <Sidebar />
            </SideBarDiv>
            {/* If the products have loaded via context, render the carousel
                and store components */}
            { products &&
                <FlexColumn>
                    <Carousel />
                    <Store>
                        {/* Map through products to render cards */}
                        { products.map(product => {
                            return (
                                <ProductCard key={product._id} product={product}/>
                            )
                            })
                        }
                    </Store>
                </FlexColumn>
            }
            {/* If the products have not loaded from Context, render loading circle */}
            {
                !products &&
                    <DefaultCircularProgress/>
            }
        </StoreWrapper>
    )
};

// Export the component for use in App
export default Homepage;

//**************************************************************** */
// Styled Components
//**************************************************************** */

const StoreWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const SideBarDiv = styled.div`
    position: absolute;
    top: 200;
    left: 0;
`;
const Store = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 80px 40px 0 250px;
`;
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column; 
    font-family: var(--font-body);
    font-size: 18px;
    margin: 40px 0 5px 200px;
    align-items: center;
`;