import {useState, useContext} from 'react';
import { StoreContext } from './StoreContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TypeAhead = () => {

    const navigate = useNavigate();
    const {products} = useContext(StoreContext);
    const [inputValue, setValue] = useState("");

    // Return results that match what the user types
    const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(inputValue.toLowerCase())
            })

    return (
        <>
            <SearchDiv>
                <SearchBar 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => {setValue(e.target.value)}} 
                    // onKeyDown={(e) => {
                    //     e.key === "Enter" && ; Might have to add filtering logic later
                    // }}
                />
                <ClearBtn onClick={()=> {setValue("")}}>Clear</ClearBtn>
            </SearchDiv>

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
                                    onClick={()=> {navigate(`/product/${product._id}`)}}
                                >
                                    {firstHalf}<Prediction>{secondHalf}</Prediction> <Category>in <CategorySpan>{product.category}</CategorySpan></Category>
                                </ProductListItem>
                    })
                }
            </ProductList> 
        }
    </>
    );
};

export default TypeAhead;

const SearchDiv = styled.div`
    margin: 50px;
    position: absolute;
    top: 180px;
    left: 250px;
`;
const Category = styled.span`
    font-style: italic;
    font-size: 12px;
`;
const CategorySpan = styled.span`
    color: var(--color-gold);
`;
const SearchBar = styled.input`
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
    padding: 6px 10px;
    font-size: 18px;
    margin-left: 10px;
    &:focus-visible {
        outline: 4px lightblue solid ;
    }
    &:hover{
        background-color: var(--color-secondary);
    }
`;
const ProductList = styled.ul`
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: 500px;
    margin-top: 5px;
    background-color: white;
    font-size: 18px;
    position: absolute;
    top: 29%;
    left: 300px;
`;
const ProductListItem = styled.li`
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