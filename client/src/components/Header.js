import { useContext } from "react";
import styled from "styled-components";
import { StoreContext } from "./StoreContext";
import { BsCartDash } from "react-icons/bs";
import logo from "../assets/logo.png";


export const Header = () => {

    const {loggedIn, setLoggedIn} = useContext(StoreContext);
    // Login logic from abouba goes here:
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoggedIn(true);
    };

    return(
        <>
        <Wrapper>
            <Logo src = {logo}/>

            <Cart>{BsCartDash}</Cart>
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
            
        </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const Logo = styled.img`
    width: 200px;
`;
const Cart = styled.button`
    border-radius: 10px;
    color: white;
    background-color: var(--color-primary);
`;
const LogIn = styled.button`
    border-radius: 10px;
    width: 100px;
    color: white;
    background-color: var(--color-primary);
`;
const LogOut = styled.button`
    border-radius: 10px;
    width: 100px;
    color: white;
    background-color: var(--color-primary);
`;