import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
    </div>
  );
};

const Input = styled.input`
  width: 220px;
  height: 25px;
`;
const Button = styled.button`
  width: 220px;
  height: 25px;
  margin: 0;
`;

const UserInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default SignIn;
