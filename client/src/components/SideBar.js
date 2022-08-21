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
      <Options>
        Checkboxes: 
        <FlexRow>
          <Checkbox type = "checkbox"/> Checkbox 1
        </FlexRow>
        <FlexRow>
          <Checkbox type = "checkbox"/> Checkbox 2
        </FlexRow>
        <FlexRow>
          <Checkbox type = "checkbox"/> Checkbox 3
        </FlexRow>
        <FlexRow>
          <Checkbox type = "checkbox"/> Checkbox 4
        </FlexRow>
        <FlexRow>
          <Checkbox type = "checkbox"/> Checkbox 5
        </FlexRow>
      </Options>
     
    </Wrapper>
  )
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: var(--color-quarternary);
`;
const Filter = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  width: 250px;
  font-family: var(--font-body);
  font-size: 24px;
  background-color: var(--color-quarternary);
  color: white;
  font-weight: 100;
  padding: 20px 0 0 0;

  `;
const Radio = styled.div`
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
  color: white;
  background-color: var(--color-quarternary);
  padding: 10px 0 0 20px;
`;
const RadioInput = styled.input`
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
  margin: 5px 10px 5px 10px;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
  color: white;
  background-color: var(--color-quarternary);
  padding: 10px 0 0 20px;
`;
const Checkbox = styled.input`
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
  margin: 15px 0 5px 0;
`;
const SubHeading = styled.h3`

`;