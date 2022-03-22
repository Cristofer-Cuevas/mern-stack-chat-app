import styled from "styled-components";

import personIcon from "./images/person_black_24dp.svg";
import lockIcon from "./images/lock_black_24dp.svg";

export const MainLogIn = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .googleBtn {
    width: 3.5rem;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .googleBtn:hover {
    transform: translateY(-0.3rem);
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    a {
      color: #2196f3;
    }
  }
`;

export const Form = styled.form`
  position: relative;
  width: 90%;
  max-width: 400px;

  .inputUsername {
    input {
      background-image: url(${personIcon});
    }
  }

  .inputPassword {
    input {
      background-image: url(${lockIcon});
    }
  }

  input:focus {
    box-sizing: border-box;
    border: 2px solid #2196f3 !important;
  }

  .inputPassword,
  .inputUsername {
    width: 100%;
    border-radius: 0.3rem;
    height: 5.5rem;

    input {
      font-size: 1rem;
      padding-left: 3rem;
      width: 100%;
      background-color: transparent;
      height: 4rem;
      outline: none;
      border-radius: 0.3rem;
      border: 2px solid transparent;
      transition: border-color 0.2s ease-in-out;

      background-position: 1rem center;
      background-color: #f5f5f5;
      background-repeat: no-repeat;
      background-size: 1.7rem;
    }
  }

  button {
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    background-color: #2196f3;
    border-radius: 0.3rem;
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
  }

  .errorMessage {
    position: absolute;
    right: 0.5rem;
    margin: 0;

    color: hsl(0, 100%, 74%);
    font-size: 0.8rem;
    font-weight: 600;
  }
`;
