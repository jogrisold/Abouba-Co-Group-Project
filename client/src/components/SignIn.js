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

const SignIn = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const [validUser, setValidUser] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    const userInformations = {
      given_name: userFirstName,
      family_name: userLastName,
      email: userEmail,
      password: userPassword,
    };
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformations),
    };

    console.log(userInformations);

    fetch("/api/users", options)
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
            <form onSubmit={handleSubmit}>
              <SignUp>Sign Up</SignUp>
              <UserInformations>
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
                <Input
                  type="password"
                  placeholder="Password"
                  value={userPassword}
                  required={true}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <Button type="submit">Sign Up</Button>
              </UserInformations>
            </form>
          </Wrapper>
        </Center>
      )}
    </>
  );
};

export default SignIn;
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