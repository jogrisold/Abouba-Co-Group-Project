import { useContext } from "react";
import { StoreContext } from "./StoreContext";
import styled from "styled-components";
import logoblue from "../assets/logoblue.png";
import { BsCartDash } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export const Header = () => {

    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser} = useContext(UserContext);
    console.log(isLoggedIn);
    const handleClick = (routename) => {
        navigate(`/${routename}`)
    }
    const handleClickLogOut = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        console.log("setIsLogged in to false")
        // set cart to empty again?
    }

    return(
        <>
        <Wrapper>
            <Logo src = {logoblue} onClick={()=> {handleClick("")}}/>
            <FlexRow>
                <Cart onClick={()=> {handleClick("cart")}}><BsCartDash size = {40}/></Cart>
                <ProfileBtn onClick={()=> {handleClick("profile")}}><FaRegUser size = {40}/></ProfileBtn>
                {
                    isLoggedIn
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
    transition: ease-in-out 200ms;
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

export default Header