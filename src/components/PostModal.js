import styled from "styled-components";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostModal = ({ showModal, handleClick, setShowModal }) => {
  const photo = useSelector((state) => state.user.userPhoto);
  const name = useSelector((state) => state.user.userName);
  const email = useSelector((state) => state.user.userEmail);
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    handleClick(e);
  };
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image ,the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const temp_name =
    email.length +
    "_" +
    name +
    "_" +
    editorText.length +
    "_" +
    Math.floor(Math.random() * 10000);
  const storageRef = ref(storage, temp_name);
  const submitPost = async () => {
    try {
      // 'file' comes from the Blob or File API
      const uploadImage = await uploadBytes(storageRef, shareImage);
      const imageURL = await getDownloadURL(ref(storage, temp_name));

      const docRef = await addDoc(collection(db, "posts"), {
        user: email,
        displayName: name,
        photoURL: photo,
        postContent: editorText,
        postImage: imageURL ? imageURL : "",
        postVideo: videoLink,
        time: serverTimestamp(new Date(Date.now())),
      });

      setShowModal("close");
      reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      {showModal == "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button
                onClick={(event) => {
                  reset(event);
                }}
              >
                <img src="https://freesvg.org/img/1544641784.png" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {photo ? <img src={photo} /> : <img src="/images/user.svg" />}

                <span>{name}</span>
              </UserInfo>
            </SharedContent>
            <Editor>
              <textarea
                value={editorText}
                onChange={(e) => {
                  setEditorText(e.target.value);
                }}
                placeholder="what do you want to talk about"
                autoFocus="true"
              ></textarea>
              {assetArea === "image" ? (
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gif ,image/jpeg ,image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file">Select an image to share</label>
                  </p>
                  {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                </UploadImage>
              ) : (
                assetArea === "media" && (
                  <>
                    <input
                      type="text"
                      placeholder="Please Input a video link"
                      value={videoLink}
                      onChange={(e) => {
                        setVideoLink(e.target.value);
                      }}
                    />
                    {videoLink && (
                      <ReactPlayer width={"100%"} url={videoLink}></ReactPlayer>
                    )}
                  </>
                )
              )}
            </Editor>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="images/photo-icon.svg" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="images/video.svg" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/shared.svg" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton onClick={submitPost}>Post</PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;

  transition: fadein 3s;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    img {
      width: 100%;
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img,
  svg {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 35px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 48px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;

  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;

  cursor: pointer;
  background: "#0a66c2";
  color: "white";

  &:hover {
    background: "#004182";
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
export default PostModal;
