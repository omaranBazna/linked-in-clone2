import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutA } from "../app/features/userSlice";

import { signout, auth } from "../firebase";
import { useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.user.userPhoto);
  console.log(photo);
  const handleSignOut = () => {
    signout(auth)
      .then((result) => {
        dispatch(signOutA());
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="https://omaranbazna.github.io/linked-in-clone2/images/home-logo.svg" />
          </a>
        </Logo>

        <Search>
          <div>
            <input placeholder="Search" />
          </div>

          <SearchIcon>
            <img
              src="https://omaranbazna.github.io/linked-in-clone2/images/search-icon.svg"
              alt=""
            />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-home.svg" />
                <span>home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-network.svg" />
                <span>networking</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-jobs.svg" />
                <span>jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-messaging.svg" />
                <span>messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-notifications.svg" />
                <span>notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                <img
                  src={
                    photo
                      ? photo
                      : "https://omaranbazna.github.io/linked-in-clone2/images/user.svg"
                  }
                />
                <span>Me</span>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/down-icon.svg" />
              </a>

              <SignOut onClick={handleSignOut}>
                <a>Sign out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img src="https://omaranbazna.github.io/linked-in-clone2/images/nav-work.svg" />
                <span>
                  Work
                  <img src="https://omaranbazna.github.io/linked-in-clone2/images/down-icon.svg" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0px 8px 0px 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      &:focus {
        outline: 2px solid rgba(20, 100, 255, 0.2);
      }
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 10px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
`;
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 40px;
  background: white;
  border-radius: 0 0 5px 0;
  width: 100px;
  height: 40px;
  font-size: 16px;

  text-align: center;
  display: none;
  cursor: pointer;
  color: rgb(0, 50, 150);
`;
const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
`;
const Work = styled(User)``;

export default Header;
