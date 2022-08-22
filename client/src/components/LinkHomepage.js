import styled from "styled-components";
import { Link } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'

const LinkHomepage = () => {
    return (
        <HomeLink to='/'><Drop><MdOutlineArrowBackIosNew/></Drop> Homepage</HomeLink>
    )
}

const HomeLink = styled(Link)`
position: absolute;
top: 220px;
left: 28%;
text-decoration: none;
font-size: 24px;
color: black;
font-weight: bold;
&:hover {
    color: var(--color-gold);
}
`
export const Drop = styled.div`
    display: inline-block;
    transform: translateY(3px);
`

export default LinkHomepage;