import React from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";


const Sidebar = () => {
  return (
    <Wrapper>
      <Filter>
        Filter: <FaFilter size={20}/>
      </Filter>
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
  padding: 30px 0 0 20px;
  background-color: rgba(120, 120, 120, 0.3);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
const Filter = styled.div`
  display: flex;
  height: 60px;
  width: 250px;
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 100;
  padding: 20px 0 0 0;
  `;
const Radio = styled.div`
  color: black;
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
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
  color: black;
  display: flex;
  flex-direction: column; 
  font-family: var(--font-body);
  font-size: 22px;
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
  color: black;
  display: flex;
  flex-direction: row; 
  font-family: var(--font-body);
  font-size: 22px;
  margin: 15px 0 5px 0;
`;
