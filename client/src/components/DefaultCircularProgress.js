//***************************************************** */
// Imports
//***************************************************** */
// Import a loading gif from mui library
import CircularProgress from '@mui/material/CircularProgress';
// Import styled - components to allow for styling
import styled from "styled-components";

// Create a component that will render a Cicular progress
// image whilst other elements load 
const DefaultCircularProgress = () => {

    // No functions needed

    //***************************************************** */
    // Render
    //***************************************************** */    
    return (
        <Center>
            <CircularProgress/>
        </Center>
        )
}

// Export it to be used across the app
export default DefaultCircularProgress;

//***************************************************** */
// Styled-Components
//***************************************************** */

// Make it centered and in color theme
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    color: var(--color-primary);
    padding: 49vh;
`