import React from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";

const Sidebar = () => {
  return (
    <Wrapper>
      <Filter>Filter our inventory:<FaFilter size={20}/></Filter>
      <Radio>
        Radio: 
        <FlexRow>
          <RadioInput type="radio"/>Radio 1
        </FlexRow>
        <FlexRow>
          <RadioInput type="radio"/>Radio 2
        </FlexRow>
        <FlexRow>
          <RadioInput type="radio"/>Radio 3
        </FlexRow>
          
      </Radio>
     
    </Wrapper>
  )
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Radio = styled.div`
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
  color: white;
  background-color: var(--color-quarternary);
  padding: 10px 0 0 0;
`;
const RadioInput = styled.input`
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
  margin: 5px 10px 5px 10px;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row; 
  font-family: var(--font-body);
  font-size: 22px;
  background-color: var(--color-quarternary);
  margin: 5px 0 5px 0;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 200px;
  font-family: var(--font-body);
  font-size: 26px;
  background-color: var(--color-quarternary);
  color: white;
  font-weight: 100;
  `;
const SubHeading = styled.h3`

`;