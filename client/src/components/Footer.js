import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {FaTwitterSquare, FaInstagram, FaFacebookSquare, FaYoutube, FaPinterest} from 'react-icons/fa';

const Footer = () => {
    return(
        <Wrapper>
            <FlexColumn>
                <StyledNavLink to = {"/myaccount"}> My Account</StyledNavLink>
                <Text><Link>Account</Link></Text>
                <Text><Link>Order History</Link></Text>
                <Text><Link>Order Status</Link></Text>
                <Text><Link>Promotions</Link></Text>
                <Text><Link>Rewards</Link></Text>
                <Text><Link>Referrals</Link></Text>
            </FlexColumn>
            <FlexColumn>
                <StyledNavLink to = {"/service"}> Customer Service</StyledNavLink>
                <Text><Link>Contact Us</Link></Text>
                <Text><Link>Payment Options</Link></Text>
                <Text><Link>Privacy Policy</Link></Text>
                <Text><Link>Terms & Conditions</Link></Text>
                <Text><Link>Shipping & Warranty</Link></Text>

            </FlexColumn>
            <FlexColumn> 
                <StyledNavLink to = {"/about"}> About Us</StyledNavLink>
                <Text>
                    Founded in 2022 by the amazing human Aboubakrine Gueye, 
                    we have been working hard for the past 4 days to provide 
                    you with the most premium of online shopping experiences. . .   
                    <a href = "/about">read more</a> 
                </Text>
            </FlexColumn>
            <FlexColumnCenter>
                <StyledNavLink to = {"/connect"}> Stay Connected</StyledNavLink>
                <FlexRow>
                    <Text><FaFacebookSquare size = {40}/></Text>
                    <Text><FaTwitterSquare size = {40}/></Text>
                    <Text> <FaInstagram size = {40}/></Text>
                    <Text><FaYoutube size = {40}/></Text>
                    <Text><FaPinterest size = {40}/></Text>
                </FlexRow>
            </FlexColumnCenter>
        </Wrapper>
    )
}

export default Footer;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 50px 100px 50px 100px;
    grid-gap: 1em;
`;
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
`;
const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: top;
    align-items: left;
    margin: 10px;
`;
const Text= styled.div`
    font-family: var(--font-body);
    font-size: 20px;
    text-align: left;
    margin: 10px;

    a{
        text-decoration: none;
        margin: 0 0 0 10px;
        color: var(--color-secondary);
    }
`;
const Link= styled.a`
    text-decoration: none;
    margin: 0 0 0 10px;
    color: var(--color-secondary);
    font-weight: 800;
`;
const StyledNavLink = styled(NavLink)`
    background: var(--color-quarternary);
    color: white;
    
    border: 1px solid transparent;
    border-radius: 4px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 18px;
    height: 42px;
    width: 100%;
    text-decoration: none;
    transition: all ease 400ms;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:hover {
        background: var(--color-primary);
        color: var(--color-tertiary);
        border-color: var(--color-selective-yellow);
    }
`;


