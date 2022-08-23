// Import styles, icons, and navlink, which will allow us to 
// navigate within the site
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {FaTwitterSquare, FaInstagram, FaFacebookSquare, FaYoutube, FaPinterest} from 'react-icons/fa';


// Footer component, unlikely that all these links will be completed but 
// is more for a realistic look for  the homepage vs a footer that just says
// (c) AB&Co. 2022

const Footer = () => {
    // ***************
    // No javascript 
    // necessary
    // ***************

    return(
        <Center>
            <Wrapper>
                <FlexColumn>
                    {/* These are placeholders that will be updated in stretch
                    if we have the time to flesh out the site to make it feel 
                    more realistic */}
                    <StyledNavLinkHeader to = {"/profile"}> My Account</StyledNavLinkHeader>
                    <StyledNavLink to = {"/profile"}>Account</StyledNavLink>
                    <StyledNavLink to = {"/profile"}>Order History</StyledNavLink>
                    <StyledNavLink to = {"/profile"}>Order Status</StyledNavLink>
                    <StyledNavLink to = {"/profile"}>Promotions</StyledNavLink>
                    <StyledNavLink to = {"/profile"}>Rewards</StyledNavLink>
                    <StyledNavLink to = {"/profile"}>Referrals</StyledNavLink>
                </FlexColumn>
                <FlexColumn>
                    <StyledNavLinkHeader to = {"/service"}> Customer Service</StyledNavLinkHeader>
                    <StyledNavLink to = {"/service"}>Contact Us</StyledNavLink>
                    <StyledNavLink to = {"/service"}>Payment Options</StyledNavLink>
                    <StyledNavLink to = {"/service"}>Privacy Policy</StyledNavLink>
                    <StyledNavLink to = {"/service"}>Terms & Conditions</StyledNavLink>
                    <StyledNavLink to = {"/service"}>Shipping & Warranty</StyledNavLink>
                </FlexColumn>
                <FlexColumn> 
                    <StyledNavLinkHeader to = {"/about"}> About Us</StyledNavLinkHeader>
                    <Text>
                        Founded in 2022 by the amazing human Aboubakrine Gueye, 
                        we have been working hard for the past 5 days to provide 
                        you with the most premium of online shopping experiences...   
                    </Text>
                        <StyledNavLink to = {"/about"}> Read more </StyledNavLink>
                </FlexColumn>
                <FlexColumnCenter>
                    <StyledNavLinkHeader to = {"/connect"}> Stay Connected</StyledNavLinkHeader>
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
                </FlexColumnCenter>
            </Wrapper>
            <ABNC> Aboubakrine Gueye & Co. © 2022 </ABNC>
        </Center>
    )
}

// Export the component for use in App
export default Footer;

// Center the wrapper
const Center= styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`;
// Create a grid layout to evenly space
// the components
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 50px 100px 50px 100px;
    grid-gap: 1em;
`;

// Create some columns
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
`;
// Additional column with align-items
// center for the social media icons
const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
`;
// Standard flex row
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: top;
    align-items: left;
    margin: 10px;
`;
// Text styling
const Text= styled.div`
    font-family: var(--font-body);
    font-size: 20px;
    text-align: left;
    margin: 10px;
    color: var(--color-quarternary);
`;
// Unique styling for the copywright component
const ABNC= styled.div`
    font-family: var(--font-body);
    font-size: 20px;
    text-align: center;
    margin: 10px;
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
    // Makes the hover color transition less
    // jarring than a binary switch
    transition: all ease 800ms;
    // Change color on hover
    &:hover {
        background: var(--color-primary);
        color: var(--color-tertiary);
    }
`;
// Slightly different formatting for the more
// specific links (routes to be fleshed out in
// stretch goals)
const StyledNavLink = styled(NavLink)`
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