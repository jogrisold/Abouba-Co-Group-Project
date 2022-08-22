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
        <Wrapper>
          <form onSubmit={handleSubmit}>
            <UserInformations>
              <Input
                type="text"
                placeholder="FirstName"
                value={userFirstName}
                required={true}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="LastName"
                value={userLastName}
                required={true}
                onChange={(e) => setUserLastName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={userEmail}
                required={true}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={userPassword}
                required={true}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <Button type="submit">Continue</Button>
              {/* <Error>Error</Error> */}
            </UserInformations>
          </form>
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

const UserInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default SignIn;
