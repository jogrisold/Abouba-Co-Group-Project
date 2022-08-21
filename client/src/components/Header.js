import { useContext } from "react";
import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { BsCartDash } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import logoblue from "../assets/logoblue.png";
import { useNavigate } from "react-router-dom";


export const Header = () => {

    const navigate = useNavigate();

    const {loggedIn, setLoggedIn} = useContext(StoreContext);
    // Login logic from abouba goes here:
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoggedIn(true);
    };

    const handleClickProfile = (e) => {

    };

    return(
        <>
        <Wrapper>
            <Logo src = {logoblue}/>
            <FlexRow>
                <Cart><BsCartDash size = {40}/></Cart>
                <ProfileBtn handleClick={handleClickProfile}><FaRegUser size = {40}/></ProfileBtn>
                {
                loggedIn 
                ? <LogOut
                    handleSubmit={(e)=>{handleSubmit(e)}}>
                    Logout
                    </LogOut> 
                : <LogIn
                    handleSubmit={(e)=> {handleSubmit(e)}}>
                    Login
                    </LogIn>}

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
`;
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.img`
    width: 250px;
`;
const Cart = styled.div`
    border-radius: 10px;
    width: 50px;
    height: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-secondary);
    `;
const ProfileBtn = styled.button`
    color: white;
    background-color: var(--color-secondary);
    border: none;
    padding-top: 10px;
`;
const LogIn = styled.button`
    font-family: var(--font-heading);
    font-size: 20px;
    border: 2px solid white;
    border-radius: 10px;
    width: 65px;
    height: 50px;
    padding: 5px;
    color: white;
    margin: 10px;
    align-items: center;
    text-align: center;
    background-color: var(--color-secondary);
`;
const LogOut = styled.button`
    font-family: var(--font-heading);
    font-size: 20px;
    border: 2px solid white;
    border-radius: 10px;
    width: 65px;
    height: 50px;
    padding: 5px;
    color: white;
    margin: 10px;
    align-items: center;
    text-align: center;
    background-color: var(--color-secondary);
`;

export default Header