import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TypeAhead = ({suggestion, handleSelect, categories}) => {
    const [input, setInput] = useState('')
    const navigate = useNavigate();
    const filteredSuggestions = () => {
        return (Object.values(suggestion)).filter(element => {
            return element.name.toLowerCase().includes(input.toLowerCase()) && input.length > 1
        })
    }
    
    return (
        
        <Wrapper>
            <div>
                <Input 
                    type='text' 
                    value = {input}
                    onChange={(event)=>{
                        setInput(event.target.value)
                    }}
                    onKeyDown={(event)=>{
                        event.key === "Enter" &&
                        handleSelect(event.target.value)  
                    }}
                />
                <Button onClick={() => setInput('')}>Clear</Button>
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
                                        navigate(`/product/${element._id}`);
                                    } else {
                                    window.alert("Sorry, that product cannot be found")
                                    }
                                }}
                            >
                                <FirstHalf>
                                    {element.name.slice(0, input.length)}
                                </FirstHalf>
                                <SecondHalf>
                                    {element.name.slice(input.length)}
                                </SecondHalf>
                                <AccentSpan> 
                                    in
                                    <PurpleSpan> 
                                        {element.category}
                                    </PurpleSpan>
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
    /* display: flex;
    gap: 0.5rem;
    flex-direction: column; */
`;

const Input = styled.input`
    border: 1px solid var(--color-primary);
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 0.4rem 0.7rem;
    margin: 80px 0;
    width: 400px;
`;

const Button = styled.button`
    background: var(--color-quarternary);
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 6px;
    margin-left: 0.8rem;
    &:hover{
        background-color: var(--color-secondary);
    }
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
        background: var(--color-primary);
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