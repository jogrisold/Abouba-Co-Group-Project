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
        <Wrapper>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <LoginSection>
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                placeholder="Email"
                // ref={useRef}
                value={userEmail}
                required={true}
                // autoComplete='off'
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <label htmlFor="password">Password:</label>
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
            <div>
              <span>Don't have an account? </span>
              <Link to="/signin">Sign Up </Link>
            </div>
          </SignInSection>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  border: none;
  border-radius: 5px;
  width: 280px;
  background-color: #4d5cdf;
  color: white;
  padding: 20px 20px 20px 20px;
  margin: 200px 400px;
  h1 {
    margin: 20px 0 20px;
  }
  /* position: absolute;
  top: 50%;
  left: 30%; */
`;
const Input = styled.input`
  width: 240px;
  height: 40px;
  border-radius: 5px;
  border: none;
`;
const Button = styled.button`
  width: 240px;
  height: 40px;
  margin: 0 0 10px;
  border-radius: 5px;
  border: none;
`;
const Error = styled.div``;
const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* border: solid 10px red; */
  width: 260px;
`;
const SignInSection = styled.div``;

export default Login;
