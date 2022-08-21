import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

//Change color later to align with theme

const DefaultCircularProgress = () => {
    
    return (
        <Center>
            <CircularProgress/>
        </Center>
        )
}

export default DefaultCircularProgress;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
`