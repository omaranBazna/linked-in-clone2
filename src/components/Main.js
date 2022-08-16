import styled from "styled-components";

import React from "react";
import PostModal from "./PostModal";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "../app/features/postsSlice";
import ReactPlayer from "react-player";

const Main = () => {
  const [showModal, setShowModal] = useState("close");
  const userName = useSelector((state) => state.user.userName);
  const postsArr = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  useEffect(() => {
    let posts = [];

    const q1 = query(collection(db, "posts"), orderBy("time"));
    const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
      posts = [];
      querySnapshot.forEach((doc) => {
        posts = [...posts, { id: doc.id, ...doc.data() }];
      });
      posts = posts.reverse();
      dispatch(setPosts(posts));
    });
  }, [userName, showModal]);
  return (
    <Container>
      <ShareBox>
        <div>
          <img src="/images/user.svg" />
          <button onClick={handleClick}>start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video.svg" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/job.svg" />
            <span>Jobs</span>
          </button>
          <button>
            <img src="/images/article.svg" />
            <span>Articles</span>
          </button>
        </div>
      </ShareBox>
      {postsArr.map((post, index) => {
        return (
          <div key={index}>
            <Article>
              <SharedActor>
                <a>
                  <img
                    src={post.photoURL ? post.photoURL : "/images/user.svg"}
                  />
                  <div>
                    <span>Title</span>
                    <span>Info</span>
                    <span>Date</span>
                  </div>
                </a>
                <button>
                  <img src="/images/ellipise.svg" />
                </button>
              </SharedActor>
              <Description>
                {post.postContent && <>{post.postContent}</>}
              </Description>
              <SharedImage>
                <a>{post.postImage && <img src={post.postImage} />}</a>
              </SharedImage>
              {post.postVideo && (
                <ReactPlayer width={"100%"} url={post.postVideo}></ReactPlayer>
              )}
              <SocialCounts>
                <li>
                  <button>
                    <img
                      src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                      alt=""
                    />
                    <img
                      src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                      alt=""
                    />
                    <span>57</span>
                  </button>
                </li>
                <li>
                  <a>2 comments</a>
                </li>
              </SocialCounts>
              <SocialAction>
                <button>
                  <img src="/images/like.svg" />
                  <span>Like</span>
                </button>
                <button>
                  <img src="/images/comments.svg" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src="/images/share.svg" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/send.svg" />
                  <span>Send</span>
                </button>
              </SocialAction>
            </Article>
          </div>
        );
      })}

      <PostModal
        showModal={showModal}
        handleClick={handleClick}
        setShowModal={setShowModal}
      />
    </Container>
  );
};
const Container = styled.div`
  grid-area: "main";
`;

const CommentCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.15), 0 0 0 rgba(0, 0, 0, 0.2);
`;
const ShareBox = styled(CommentCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  padding: 5px 15px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 50px;
      background: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 1px 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        border-radius: 3px;
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.11);
        }
      }
    }
  }
`;
const Article = styled(CommentCard)`
  padding: 0;
  margin: 10px 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 20px;
  padding: 10px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #c9e5c9;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background: transparent;
    }
  }
`;
const Button = styled.button``;

const SocialAction = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
export default Main;
