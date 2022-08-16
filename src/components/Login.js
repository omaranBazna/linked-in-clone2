import React from "react";
import styled from "styled-components";
import { signin, Provider, auth } from "../firebase";
import { useDispatch } from "react-redux/es/exports";
import { signOutA, signInA } from "../app/features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const navigate = useNavigate();
  const handleSignin = () => {
    signin(auth, Provider)
      .then((result) => {
        navigate("../home", { replace: true });
        dispatch(
          signInA({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userPhoto: result.user.photoURL,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <Nav>
        <a href="">
          <img src="/images/login-logo.svg" />
        </a>
        <div>
          <Join>Join Now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community </h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          {!userName && (
            <Google onClick={handleSignin}>
              <img src="/images/google.svg" />
              Sign In with Google
            </Google>
          )}
        </Form>
      </Section>
    </Container>
  );
};
const Container = styled.div`
  padding: 0;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: 0;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 76px) {
      padding: 0 5px;
    }
  }
  & > div {
    display: flex;
  }
`;
const Join = styled.div`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
  }
`;
const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a6c20;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
  }
`;
const Section = styled.section`
  display: flex;
  align-content: flex-start;
  min-height: 700px;
  padding-bottom: 13px;
  padding: 40px;
  padding: 60px 0px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media screen and (max-width: 768px) {
    min-height: 0px;
    margin: auto;
  }
`;
const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2972c9;
    font-weight: 200;
    line-height: 70px;
    @media screen and (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    z-index: 2;
    width: 700px;
    height: 670px;
    position: absolute;

    right: -150px;
    bottom: -2px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;
const Form = styled.div`
  margin-top: 100px;
  width: 400px;
  z-index: 3;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 80%;
  border-radius: 28px;
  vertical-align: middle;
  font-size: 20px;
  transition-duration: 167ms;
  color: rgba(0, 0, 0, 0.6);
  margin: auto;
  z-index: 3;
  cursor: pointer;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;
export default Login;
