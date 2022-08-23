import React from "react";
import { useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./UserContext";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignUp = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [validUser, setValidUser] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputType, setInputType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  
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

  //Create a function to handle form submission
  const handleSubmit = (e) => {
    // Stop the page from reloading
    e.preventDefault();
    // Pass the data from the form into
    // an object that we can pass to the 
    // backend
    const userInformations = {
      given_name: userFirstName,
      family_name: userLastName,
      email: userEmail,
      password: passwordInput,
    };
    // Define our options for the post method
    // including stringifying our object to 
    // post to mongoDB
    const options = {
      method: "POST",
      body: JSON.stringify(userInformations),
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json" 
      },
    };

    // Create a function that will post request the user data
    // if the user passes the input handling below
    const addUser = (options) => {
      fetch("/api/users", options)
        .then((res) => res.json())
        .then((json) => {
          const {status, message, error} = json;
          if (status >= 400) {
            // If there is an error, display a styled error message
            setErrorMsg(message);
            setPopUp(true);
          } else if(status === 200){
            // If the response is a success, log the new user in and 
            // set the current user data for use in cart /profile,
            // then navigate to the homepage so the user can resume shopping
            setValidUser(true);
            setIsLoggedIn(true);
            setCurrentUser(json.data);
            navigate("/");
          } else if (error){
            // Any uncaught json errors
            window.alert("Error: " + error);
          }
        })
        // Uncaught fetch errors
        .catch((err) => console.log(err));
    };

    // Input Handling
    // Check if they got the password right
    if(passwordInput !== confirmPasswordInput ){
      setErrorMsg("Passwords do not match");
      setPopUp(true);
    // This one is not perfect as .gov .org etc will not 
    // be covered but IIWII
    } else if (userEmail.toString().includes(".com") !== true ) {
      setErrorMsg("Email is not valid");
      setPopUp(true);
    // ******************************
    // MORE ELSE IF CAN BE ADDED HERE  
    // ******************************
    } else {
      addUser(options);
    }
    };


  return (
    <>
    {popUp 
    ? (<Center>
        <PopUp> 
        <FlexCol>
        <H2>Ooopsie daisie!</H2>
        <Text>
          Sorry,It seems like something went wrong with the SignUp process:
        </Text>
        <Text>
          {errorMsg}
        </Text>
        <Text>
          Please Try Again:
        </Text>
        <Button 
        onClick = {()=>setPopUp(false)}
        type="ok">Ok</Button>
        </FlexCol>
        </PopUp>
      </Center>)
    : (<></>)
    }
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
            <SignUpForm 
            onSubmit={handleSubmit}>
              <SignUpText>Sign Up</SignUpText>
              <Label for='first-name'>First Name</Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={userFirstName}
                  required={true}
                  onChange={(e) => setUserFirstName(e.target.value)}
                />
                <Label for='last-name'>Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={userLastName}
                  required={true}
                  onChange={(e) => setUserLastName(e.target.value)}
                />
                <Label for='email'>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={userEmail}
                  required={true}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Label for='password'>Password</Label>
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
              <Label for='confirm-password'>Confirm Password</Label>
              <FlexRow>
                <Input 
                  type={inputType} 
                  placeholder="Confirm Password"
                  aria-describedby="password-constraints"
                  value={confirmPasswordInput} 
                  required = {true}  
                  onChange={(e)=>setConfirmPasswordInput(e.target.value)} 
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
              <Button type="submit">Sign Up</Button>
            </SignUpForm>
          </Wrapper>
        </Center>
      )}
    </>
  );
};

export default SignUp;

const PopUp= styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    border: 1px solid black;
    position: absolute;
    z-index: 1;
    margin: 240px 0 0 0;
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
  color: white;
  padding: 50px;
  margin: 100px 0 100px 0;
  h1 {
    margin: 20px 0 20px;
  }
`;
const HomepageLink = styled.a`
  color: white;
  font-size: 26px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  text-decoration: none;
`;
const GoHome = styled.div`
    text-align: left;
    padding: 30px 0 0 0;
    font-size: 36px;
`;
const SignUpForm = styled.form`
display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SignUpText = styled.div`
  color: white;
  font-size: 38px;
  font-weight: 600;
  font-family: var(--font-heading);
  margin: 10px 0 30px 0;
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
const H1 = styled.h1`
    text-align: left;
    padding: 0 0 30px 0;
    font-size: 36px;
    color:white;
`;
const H2 = styled.h1`
    text-align: center;
    padding: 0 0 40px 0;
    font-size: 36px;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;
const Text = styled.div`
  margin: 20px 0 20px 0 ;
`;

const TogglePassword = styled.button`
    height: 43px;
    width: 43px;
    border-radius: 10px;
    background-color: white;
    padding: 4px 0 0 1px;
`;
const FlexRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;