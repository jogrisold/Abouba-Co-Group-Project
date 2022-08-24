//**************************************************************** */
// Imports
//**************************************************************** */

// React dependencies
import styled from "styled-components";
import { Link } from "react-router-dom";
import {TbArrowBackUp} from 'react-icons/tb'


const LinkHomepage = () => {

    //**************************************************************** */
    // No functions/constants required, Render:
    //**************************************************************** */

    return (
        <HomeLink to='/'><Drop><TbArrowBackUp/></Drop> Homepage</HomeLink>
    )
}

export default LinkHomepage;

//**************************************************************** */
// Styled-Components:
//**************************************************************** */

// Allows for a styled link componenent
// that will not re-render page, losing state
const HomeLink = styled(Link)`
text-decoration: none;
margin-left: 10px;
font-size: 24px;
color: black;
font-weight: bold;
color: var(--color-secondary);
&:hover {
    color: var(--color-gold);
}
`;
// Inline block/transform styling
// export to be used in ItemDetails
export const Drop = styled.div`
    display: inline-block;
    transform: translateY(3px);
`;