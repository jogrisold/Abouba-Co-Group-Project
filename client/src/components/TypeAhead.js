import {useState, useContext} from 'react';
import { StoreContext } from './StoreContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TypeAhead = () => {

    const navigate = useNavigate();
    const {products} = useContext(StoreContext);
    const [inputValue, setInputValue] = useState("");

    // Return results that match what the user types
    const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(inputValue.toLowerCase())
            })
    // When a user clicks on a suggestion, navigate to the item details page and clear the input field
    const handleSuggestionClick = (product) => {
        navigate(`/product/${product._id}`)
        setInputValue("");
    }

    return (
        <>
        <FlexCol>
            <SearchDiv>
                <SearchBar 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => {setInputValue(e.target.value)}} 
                    // onKeyDown={(e) => {
                    //     e.key === "Enter" && ; Might have to add filtering logic later
                    // }}
                />
                <ClearBtn onClick={()=> {setInputValue("")}}>Clear</ClearBtn>
            

        {
            // Render matches
            filteredProducts.length > 0 && inputValue.length >= 2 
            &&
            <ProductList>
                {
                    filteredProducts.map(product => {
                        // Find index of word and split for styling
                        let indexOfsecondHalf = product.name.toLowerCase().indexOf(inputValue.toLowerCase())
                        let firstHalf = product.name.slice(0, indexOfsecondHalf + inputValue.length)
                        let secondHalf = product.name.slice(indexOfsecondHalf + inputValue.length)
                        // Clicking a suggestion navigates to the product details page
                        return <ProductListItem 
                                    key={product._id} 
                                    onClick={()=> {handleSuggestionClick(product)}}
                                >
                                    {firstHalf}<Prediction>{secondHalf}</Prediction> <Category>in <CategorySpan>{product.category}</CategorySpan></Category>
                                </ProductListItem>
                    })
                }
            </ProductList> 
        }
        </SearchDiv>
        </FlexCol>
    </>
    );
};

export default TypeAhead;

const SearchDiv = styled.div`
    display: relative;
`;
const Category = styled.span`
    font-style: italic;
    font-size: 12px;
`;
const CategorySpan = styled.span`
    color: var(--color-gold);
`;
const SearchBar = styled.input`
    position: relative;
    font-size: 16px;
    height: 26px;
    width: 400px;
    padding-left: 8px;
    border: 2px solid var(--color-primary);
    border-radius: 5px;
    &:focus-visible {
        outline: 2px solid var(--color-secondary);
    }
`;
const ClearBtn = styled.button`
    color: #fff;
    background-color: var(--color-quarternary);
    border: none;
    border-radius: 5px;
    font-size: 18px;
    margin-left: 30px;
    padding: 5px 10px;
    transition: ease-in-out 100ms;
    &:focus-visible {
        outline: 4px lightblue solid ;
    }
    &:hover{
        transform: scale(1.1);
    }
    &:active{
        transform: scale(.9);
        background-color: var(--color-primary);
    }
`;
const ProductList = styled.ul`
    z-index: 1;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: 500px;
    margin-top: 5px;
    background-color: white;
    font-size: 18px;
    position: absolute;
`;
const ProductListItem = styled.li`
    z-index: 1;
    padding: 10px;
    font-size: 18px;
    &:hover {
        background-color: whitesmoke;
        border-radius: 5px;
    }
`;
const Prediction = styled.span`
    font-weight: bold;
`;
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 30px;
`;