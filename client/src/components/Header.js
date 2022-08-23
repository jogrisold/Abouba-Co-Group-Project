// Import react dependencies
import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Local dependencies
import logoblue from "../assets/logoblue.png";
import { UserContext } from "./UserContext";
// Icons
import { BsCartDash } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

// The Header is an element that will sit at the top of 
// all pages, it is defined as a constant here and passed
// to App.
const Header = () => {
    // Use Context to bring in the needed states for the code below
    const {isLoggedIn, setIsLoggedIn, setCurrentUser} = useContext(UserContext);
    // Define a navigator to allow us to use Navigate to move
    // the user to the desired page without them clicking on 
    // any links
    const navigate = useNavigate();
    
    // Define a function to handle navgation to 
    const handleClick = (routename) => {
        navigate(`/${routename}`)
    }
    const handleClickLogOut = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        // ******************************
        // TO DO: set cart to empty again
        // ******************************
    }

    return(
        <>
        <Wrapper>
            <Logo src = {logoblue} onClick={()=> {handleClick("")}}/>
            <FlexRow>
                <Cart onClick={()=> {handleClick("cart")}}><BsCartDash size = {40}/></Cart>
                <ProfileBtn onClick={()=> {handleClick("profile")}}><FaRegUser size = {40}/></ProfileBtn>
                
                {/* Conditional rendering for button based on 
                whether the user is logged in or not */}
                {isLoggedIn
                    ? <LogOut
                        onClick={handleClickLogOut}
                        >
                        Logout
                        </LogOut> 
                    : <LogIn
                        onClick={()=> {handleClick("login")}}
                        >
                        Login
                        </LogIn>
                }
            </FlexRow>
        </Wrapper>
        </>
    )
};

// Export the component to be used in App
export default Header;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-secondary);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const FlexRow = styled.div`
    width: 15%;
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.img`
    width: 190px;
    margin-left: 30px;
`;
const Cart = styled.button`
    border-radius: 10px;
    width: 50px;
    height: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-secondary);
    border: none;
    cursor: pointer;
    transition: ease-in-out 200ms;
    &:hover {
        transform: scale(1.2);
        color: var(--color-primary);
    }
    `;
const ProfileBtn = styled.button`
    color: white;
    background-color: var(--color-secondary);
    border: none;
    padding-top: 10px;
    cursor: pointer;
    transition: ease-in-out 200ms;
    &:hover {
        transform: scale(1.2);
        color: var(--color-primary);
    }
`;
const LogIn = styled.button`
    font-family: var(--font-heading);
    color: white;
    font-size: 20px;
    border: 2px solid white;
    border-radius: 10px;
    width: 65px;
    height: 50px;
    padding: 5px;
    margin: 10px;
    align-items: center;
    text-align: center;
    background-color: var(--color-secondary);
    cursor: pointer;
    transition: ease-in-out 500ms;
    &:hover {
        border-color: var(--color-secondary);
        color:var(--color-secondary);
        background-color: white;
    }
`;
const LogOut = styled.button`
    font-family: var(--font-heading);
    font-size: 20px;
    border: 2px solid white;
    border-radius: 10px;
    width: 85px;
    height: 50px;
    padding: 5px;
    color: white;
    margin: 10px;
    align-items: center;
    text-align: center;
    background-color: var(--color-secondary);
    cursor: pointer;
    &:hover {
        border-color: var(--color-secondary);
        color:var(--color-secondary);
        background-color: white;
    }
`;