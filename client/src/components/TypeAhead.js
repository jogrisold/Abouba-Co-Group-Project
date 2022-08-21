import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TypeAhead = ({suggestion, handleSelect, categories}) => {
    const [input, setInputState] = useState('')
    const navigate = useNavigate();
    const filteredSuggestions = () => {
        return (Object.values(suggestion)).filter(element=>{
            return element.name.toLowerCase().includes(input.toLowerCase()) 
            &&
            input.length > 1
        })
    }
    const handleClick = (element) => {
        console.log(element._id);
        if(element._id > 0){
            navigate(`/ItemDetails/${element._id}`);
        }
    }
    
    return (
        
        <Wrapper>
            <div>
                <Input 
                type='text' 
                value = {input}
                onChange={(event)=>{
                    setInputState(event.target.value)
                }}
                onKeyDown={(event)=>{
                    event.key === "Enter" &&
                    handleSelect(event.target.value)  
                }}
                />
                <Button onClick={() => setInputState('')}>Clear</Button>
            </div>
            
            {
            filteredSuggestions().length > 0
            &&
            <UoList>
                {filteredSuggestions().map(element => {
                return ( 
                    <Suggestion 
                    key={element._id}
                    onClick={()=>{
                        if(element._id > 0){
                            navigate(`/products/${element._id}`);
                        }
                    }}>
                        <FirstHalf>
                            {element.name.slice(0, input.length)}
                        </FirstHalf>
                        <SecondHalf>
                            {element.name.slice(input.length)}
                        </SecondHalf>
                        <AccentSpan> in
                            <PurpleSpan> {element.category}</PurpleSpan>
                         </AccentSpan>
                    </Suggestion>
                )
                })} 
                </UoList> 
            }
        </Wrapper>
    )
};

export default TypeAhead;

const Wrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
`;

const Input = styled.input`
    font-size: 1.5rem;
    padding: 0.4rem 0;
    margin: 100px 0 100px 0;
    width: 400px;
`;

const Button = styled.button`
    background: blue;
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 6px;
    margin: 0 0.25rem;
`;

const UoList = styled.ul`
    border: 1px solid black;
    max-width: 400px;
    z-index: 1;
    position: absolute;
    background-color: white;
    margin: 100px 0 100px 0;
    width: inherit;
`;

const Suggestion = styled.li`
    width: inherit;
    margin: 0.5rem;
    padding: 0.25rem;
    line-height: 1.3;
    background-color: white;
    cursor: pointer;
    &:hover,
    &:focus,
    &:active {
        background: beige;
    }
`;
const FirstHalf = styled.span`
    font-weight: bold;
    width: 400px;
`;
const SecondHalf = styled.span`
    width: 400px;
`;

const PurpleSpan = styled.span`
    color: var(--color-secondary);
`;

const AccentSpan = styled.span`
    font-style: italic;
`;