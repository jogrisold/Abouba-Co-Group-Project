import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    const userLogin = { email: userEmail, password: userPassword };
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    };

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
        <LoginSection>
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
        </LoginSection>
      </form>
      <SignInSection>
        <div>
          <span>Don't have an account? </span>
          <Link to="/signin">Sign In </Link>
        </div>
      </SignInSection>
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
const Error = styled.div``;
const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SignInSection = styled.div``;

export default Login;
