import styled from "styled-components";
import { Link } from "react-router-dom";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'

const LinkHomepage = () => {
    return (
        <HomeLink to='/'><MdOutlineArrowBackIosNew/>Homepage</HomeLink>
    )
}

const HomeLink = styled(Link)`
display: flex;
align-items: center;
text-decoration: none;
color: black;

`

export default LinkHomepage;