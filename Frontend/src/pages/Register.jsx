import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const resetUserData = () => {
    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      alert("Password and Confirm Password are not same!");
      return;
    }
    try {
      const res = await publicRequest.post("/auth/register", userData);
      res && alert("User Registered Successfully!");
      resetUserData();
      return;
    } catch (err) {
      alert(err);
      return;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={userData.username}
          />
          <Input
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={userData.email}
          />
          <Input
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
