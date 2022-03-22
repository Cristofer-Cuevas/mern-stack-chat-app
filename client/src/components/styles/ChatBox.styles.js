import styled from "styled-components";

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  grid-template-rows: 4rem 1fr 3.8rem;

  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;

  .userInfo {
    display: flex;
    align-items: center;
  }

  .goBackIconContainer {
    margin-left: 1rem;
  }

  .goBackIcon:hover {
    transform: scale(80%);
  }

  .usernameAndImageContainer {
    margin-left: 2rem;
    display: flex;
  }
  .userImageContainer {
    position: relative;
    margin-right: 0.7rem;
    align-items: center;
  }

  .userNameAndStatus {
    display: flex;
    flex-direction: column;
    .status {
      font-size: 0.7rem;
    }
  }

  .chatContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */

    overflow: scroll;
  }

  .messagesUl::-webkit-scrollbar,
  .chatContainer::-webkit-scrollbar {
    display: none;
  }

  .requestMessages {
    display: block;
    cursor: pointer;
    margin: 0 auto;
    opacity: 0.5;
  }

  .messagesUl {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }

  .messageContainer {
    display: flex;
    align-items: flex-end;

    width: auto;
    height: auto;
    margin: 1rem 2rem;

    align-self: flex-start;
  }
  .message {
    margin: 0;
    border-radius: 0.3rem;
    padding: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    background-color: #f5f5f5;
    max-width: 17rem;
  }

  @media screen and (min-width: 700px) {
    .message {
      max-width: 25rem;
    }
  }

  .me {
    align-self: end;

    .message {
      background-color: #2196f3;
      color: white;
    }

    .messageAndDateContainerMe {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .date {
      margin-right: 0;
    }

    .imgContainerMe {
      margin-left: 0.7rem;
      height: 2.5rem;
    }
  }

  .date {
    display: block;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 0.5rem;
  }

  .imgContainer {
    height: 2.5rem;
    margin-right: 0.8rem;
  }

  .userImg {
    width: 2.5rem;
  }

  width: 100%;

  .inputContainer {
    margin: 0 auto;
    border-radius: 0.2rem;
    width: 70%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    margin-bottom: 1rem;

    background-color: #f5f5f5;
    .iconSend {
      padding: 0;
      margin: 0;
      img {
        padding: 0;
        margin: 0;
      }
    }

    .input {
      outline: none;
      background-color: transparent;
      width: 80%;
      font-size: 1rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.7);
    }

    .input::placeholder {
      font-size: 1rem;
      font-weight: 600;
    }
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
