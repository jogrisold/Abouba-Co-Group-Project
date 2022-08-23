// Import a loading gif from mui library
import CircularProgress from '@mui/material/CircularProgress';
// Import styled - components to allow for styling
import styled from "styled-components";

const DefaultCircularProgress = () => {
    // Return a default loading image to 
    // use in any loading scenarios
    return (
        <Center>
            <CircularProgress/>
        </Center>
        )
}

// Export it to be used across the app
export default DefaultCircularProgress;

// Make it centered and in color theme
const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    color: var(--color-primary);
    padding: 49vh;
`