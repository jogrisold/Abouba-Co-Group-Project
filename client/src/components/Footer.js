//**************************************************************** */
// Imports
//**************************************************************** */

// Import styles, icons, and navlink, which will allow us to 
// navigate within the site
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {FaTwitterSquare, FaInstagram, FaFacebookSquare, FaYoutube, FaPinterest} from 'react-icons/fa';


// Footer component to be used in app
const Footer = () => {
    // *******************************
    // No functions necessary, Render:
    // *******************************
    return(
        <Center>
            <Wrapper>
                <FlexColumnCenter>
                    <StyledNavLinkHeader to = {"/profile"}> My Account</StyledNavLinkHeader>
                    <StyledNavLinkHeader to = {"/"}> Stay Connected</StyledNavLinkHeader>
                    <FlexRow>
                    {/* Social Media Links */}
                        <Socials 
                            href = "https://www.facebook.com/ConcordiaUniversity">
                            <FaFacebookSquare size = {40}/></Socials>
                        <Socials 
                            href = "https://twitter.com/Concordia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                            <FaTwitterSquare size = {40}/></Socials>
                        <Socials 
                            href = "https://www.instagram.com/concordiauniversity/?hl=en"> 
                            <FaInstagram size = {40}/>
                        </Socials>
                        <Socials 
                            href = "https://www.youtube.com/user/concordiaUni">
                            <FaYoutube size = {40}/>
                        </Socials>
                        <Socials 
                            href = "https://www.pinterest.ca/concordia/">
                            <FaPinterest size = {40}/>
                        </Socials>
                    </FlexRow>
            <ABNC> Aboubakrine Gueye & Co. © 2022 </ABNC>
                </FlexColumnCenter>
            </Wrapper>
        </Center>
    )
}

// Export the component for use in App
export default Footer;

//**************************************************************** */
// Styled Components
//**************************************************************** */

// Center the wrapper
const Center= styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin: 5% 10% 0 0;
`;
// Create a grid layout to evenly space
// the components
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
// Additional column with align-items
// center for the social media icons
const FlexColumnCenter = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 69%;
`;
// Standard flex row
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
`;
// Unique styling for the copywright component
const ABNC= styled.div`
    font-family: var(--font-body);
    font-size: 20px;
    text-align: center;
    margin: 10px 0 40px 0;
`;
// Allows us to style our links
const StyledNavLinkHeader = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 100%;
    height: 42px;
    background: var(--color-quarternary);
    color: white;
    border-radius: 4px;
    font-family: var(--font-heading);
    font-size: 18px;
    margin: 0 0 20px;
    // Makes the hover color transition less
    // jarring than a binary switch
    transition: all ease 800ms;
    // Change color on hover
    &:hover {
        background: var(--color-primary);
        color: var(--color-tertiary);
    }
`;
// Same formatting but for external links
const Socials = styled.a`
    text-decoration: none;
    text-align: left;
    font-family: var(--font-body);
    font-size: 20px;
    font-weight: 800;
    color: var(--color-quarternary);
    margin: 10px;
    &:hover {
        color: var(--color-secondary);
    }
`;