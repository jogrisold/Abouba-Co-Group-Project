import styled from "styled-components";
import { Link } from "react-router-dom";
import {TbArrowBackUp} from 'react-icons/tb'

const LinkHomepage = () => {
    return (
        <HomeLink to='/'><Drop><TbArrowBackUp/></Drop> Homepage</HomeLink>
    )
}

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
`
export const Drop = styled.div`
    display: inline-block;
    transform: translateY(3px);
`

export default LinkHomepage;