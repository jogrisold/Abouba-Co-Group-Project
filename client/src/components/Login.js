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

const Login = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [validUser, setValidUser] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userLogin = { email: userEmail, password: userPassword };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    };

    fetch("/api/login", options)
      .then((res) => {
        if (res.status >= 400) {
          // focus on email
          console.log("RES = ", res);
          window.alert(res.message);
        }
        return res.json();
      })
      .then((data) => {
        // The password is good redirect user to the Homepage
        console.log(data);
        setCurrentUser(data.data);
        setIsLoggedIn(true);
        setValidUser(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {validUser ? (
        <div>
          <h1>You are logged in!</h1>
          <br />
          <br />
          <span>
            <Link to="/">Go to Homepage</Link>
          </span>
        </div>
      ) : (
        <Center>
        <Wrapper>
          <H1>Log In</H1>
          <form onSubmit={handleSubmit}>
            <LoginSection>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                placeholder="Email"
                // ref={useRef}
                value={userEmail}
                required={true}
                // autoComplete='off'
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                placeholder="Password"
                value={userPassword}
                required={true}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <Button type="submit">Continue</Button>
            </LoginSection>
          </form>
          <SignInSection>
            <FlexRow>
              <NoAccount>Don't have an account? </NoAccount>
              <SignUpLink href="/signin">Sign Up </SignUpLink>
            </FlexRow>
          </SignInSection>
        </Wrapper>
        </Center>
      )}
    </>
  );
};

export default Login;

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
  padding: 50px;
  margin: 100px 0 100px 0;
  h1 {
    margin: 20px 0 20px;
  }
`;
const H1 = styled.h1`
    text-align: left;
    padding: 0 0 30px 0;
    color: white;
    font-size: 36px;
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
const SignUp = styled.div`
  color: white;
  font-size: 38px;
  font-weight: 600;
  font-family: var(--font-heading);
  margin: 10px 0 30px 0;

`;
const UserInformations = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const Error = styled.div``;
const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* border: solid 10px red; */
  width: 100%;
`;
const SignInSection = styled.div`
`;
const SignUpLink = styled.a`
  color: white;
  font-size: 12px;
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