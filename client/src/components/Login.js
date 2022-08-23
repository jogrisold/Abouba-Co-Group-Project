import React from "react";
import { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Login = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [inputType, setInputType] = useState("password");
  const [validUser, setValidUser] = useState(false);
  const [popUp, setPopUp] = useState(false);
  let navigate = useNavigate();

  // Create a function to toggle visibility of 
  // password and confirm password inputs by 
  // changing the type of input
  const togglePassword =()=>{
    if(inputType === "password")
    {
     setInputType("text")
     return;
    }
    setInputType("password")
  }

  const handleSubmit = (e) => {
    // Stop the page from automatically reloading on submit
    e.preventDefault();
    // Create an object to post to the server
    const userLogin = { 
      email: userEmail, 
      password: passwordInput 
    };
    // Set up our options sprcifying the body to be posted and the 
    // header data type/ method
    const options = {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json" 
      },
    };
    // Post to the server
    fetch("/api/login", options)
      .then((res) => res.json())
      .then((json) => {
        const {status, error} = json;
        if (status >= 400) {
          // If there is an error, display an error message
          setPopUp(true);
        } else if(status === 200){
          // If the response is a success, set the user login state 
          // set the current user data for use in cart and profile
          // and navigate to the homepage so the user can begin shopping
          setValidUser(true);
          setIsLoggedIn(true);
          setCurrentUser(json.data);
          navigate("/");
        } else if (error){
          // Any uncaught json errors
          window.alert("Error: " + error)
        }
      })
      // Uncaught fetch errors
      .catch((err) => console.log(err));
    };
  
  return (
    <>
    {popUp 
    ? (<Center>
        <PopUp> 
        <FlexCol>
        <H2>Ooopsie daisie!</H2>
        <Text>
          Sorry,
          It seems like the Username and Password
          you have entered do not match. 
          Please try again
        </Text>
        <Button 
        onClick = {()=>setPopUp(false)}
        type="ok">Ok</Button>
        </FlexCol>
        </PopUp>
      </Center>)
      : (<></>) }
      {isLoggedIn ? (
        <Center>
        <Wrapper>
          <H1>You are logged in!</H1>
          <GoHome>
            <HomepageLink 
            href="/">Go to Homepage</HomepageLink>
          </GoHome>
          </Wrapper>
        </Center>
      ) : (
        <Center>
        <Wrapper>
          <H1>Log In</H1>
          <LoginForm onSubmit={handleSubmit}>
            <LoginSection>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                placeholder="Email"
                value={userEmail}
                required={true}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Label htmlFor="password">Password:</Label>
              <FlexRow>
                <Input 
                  type={inputType} 
                  placeholder="Password"
                  value={passwordInput} 
                  aria-describedby="password-constraints"
                  required = {true}
                  onChange={(e) => setPasswordInput(e.target.value)} 
                />
                <TogglePassword 
                  type="button"
                  aria-label="Show password as plain text.
                    Warning: this will display your password on the screen."
                  onClick={togglePassword}>
                  { inputType ==="password"
                  ? <AiOutlineEyeInvisible size = {25} />
                  : <AiOutlineEye size = {25}/>}
                </TogglePassword>
                </FlexRow>
              <Button type="submit">Continue</Button>
            </LoginSection>
          </LoginForm>
          <SignUpSection>
            <FlexRow>
              <NoAccount>Don't have an account? </NoAccount>
              <SignUpLink href="/signup">Sign Up </SignUpLink>
            </FlexRow>
          </SignUpSection>
        </Wrapper>
        </Center>
      )}
    </>
  );
};

export default Login;

const PopUp= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    border: 1px solid black;
    position: absolute;
    z-index: 1;
    margin: 210px 0 0 0;
    font-size: 26px;
    font-family: var(--font-heading);
    background-color: white;
    width: 450px;
    padding: 20px;
`;
const Center= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
const Wrapper = styled.div`
  border: none;
  border-radius: 5px;
  width: 450px;
  background-color: var(--color-secondary);
  padding: 20px 50px 20px 50px;
  margin: 100px 0 100px 0;
  h1 {
    margin: 20px 0 20px;
  }
`;
const H1 = styled.h1`
    text-align: left;
    padding: 0 0 30px 0;
    font-size: 36px;
    color:white;
`;
const H2 = styled.h1`
    text-align: center;
    padding: 0 0 10px 0;
    font-size: 36px;
`;
const GoHome = styled.div`
    text-align: left;
    padding: 30px 0 0 0;
    font-size: 36px;
`;
const LoginForm = styled.form`
`;
const Label = styled.label`
    font-size: 1rem;
    color: white;
    text-align: left;
    font-size: 24px;
    width: 100%;
`;
const Input = styled.input`
  font-size: 24px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  margin: 0 0 10px 0;

`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  margin: 0 0 10px;
  border-radius: 5px;
  border: none;
  margin: 10px 0;
`;
const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const SignUpSection = styled.div`
`;
const SignUpLink = styled.a`
  color: white;
  font-size: 12px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  text-decoration: none;
`;
const HomepageLink = styled.a`
  color: white;
  font-size: 26px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  text-decoration: none;
`;
const NoAccount = styled.div`
  color: white;
  font-size: 18px;
`;
const FlexRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;
const Text = styled.div`
  margin: 20px 0 20px 0 ;

`;const TogglePassword = styled.button`
    height: 43px;
    width: 43px;
    border-radius: 10px;
    background-color: white;
    padding: 4px 0 0 1px;
`;
