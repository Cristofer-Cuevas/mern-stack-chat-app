import styled from "styled-components";
import searchIcon from "./images/search_black_24dp.svg";

export const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100vh;
  position: relative;

  @media screen and (min-width: 900px) {
    grid-template-columns: 370px 1fr;
    .chatBox {
      position: static;
    }
  }

  .wrapper {
    height: 100vh;
    overflow-y: auto;
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 10rem;

    nav {
      button {
        padding: 0.8rem 1.3rem;
        cursor: pointer;
        font-size: 0.89rem;
        color: rgba(0, 0, 0, 0.3);
        font-weight: 600;
        transition: color 0.2s, background-color 0.3s;
      }

      .btnClicked {
        color: #2196f3;
        background-color: #f5f5f5;
        border-radius: 1.5rem;
      }
    }
  }

  .inputAndMenuContainer {
    display: flex;
    position: relative;
    justify-content: space-around;
    width: 85%;
  }

  .inputSearch {
    background-image: url(${searchIcon});
    background-repeat: no-repeat;
    background-position: 1rem center;
    padding-left: 3rem;
    width: 85%;
    height: 3.5rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
    outline: none;
    color: rgba(0, 0, 0, 0.6);
    background-color: #f5f5f5;
  }

  .threeDotIcon {
    cursor: pointer;
    width: 2rem;
    opacity: 0.5;
  }

  .signOutBtnContainer {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0 2rem;
    height: 7rem;
    right: 0;
    bottom: -8rem;
    display: none;
    position: absolute;
  }

  .loginInfo {
    margin: 0;
    padding: 0;
  }

  .userLoggedInName {
    font-weight: bold;
  }

  .showSignOutBtnContainer {
    display: flex;
  }

  .signOutBtn {
    display: block;
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 48px;
    justify-content: center;
    letter-spacing: -0.8px;
    line-height: 24px;
    min-width: 140px;
    outline: 0;
    padding: 0 17px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .signOutBtn:focus {
    color: #171e29;
  }

  .signOutBtn:hover {
    border-color: #06f;
    color: #06f;
    fill: #06f;
  }

  .signOutBtn:active {
    border-color: #06f;
    color: #06f;
    fill: #06f;
  }

  .title {
    margin-left: 1rem;
  }
`;

export const UsersBox = styled.div`
  margin-left: 0.5rem;
  img {
    width: 2.5rem;
  }

  a {
    color: black;
  }

  .userBox {
    display: flex;
    z-index: -1;
    height: 4rem;
    margin-top: 1rem;
    position: relative;
    margin-left: 1rem;
  }

  .usernameAndMessages {
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 0.7rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .messagePreview {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    height: 5rem;

    text-overflow: ellipsis;

    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    opacity: 0.8rem;
  }

  .isMessageReadContainer {
    margin-right: 1rem;
    img {
      width: 1.8rem;
    }
  }

  .userImageContainer {
    width: 2.5rem;
    border-radius: 50%;
  }
  .userName {
    font-size: 0.9rem;
    font-weight: bold;
  }

  .offline {
    display: block;
    position: absolute;
    top: 0.7rem;
    left: -0.7rem;
    width: 1.19rem;
    background-color: #bbb;
    height: 1.2rem;
    border: 4px solid white;
    border-radius: 50%;
  }

  .online {
    display: block;
    position: absolute;
    top: 0.7rem;
    left: -0.7rem;
    width: 1.19rem;
    background-color: #2196f3;
    height: 1.2rem;
    border: 4px solid white;
    border-radius: 50%;
  }
`;
