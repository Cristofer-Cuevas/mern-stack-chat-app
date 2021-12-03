import React from "react";
import { MainLogIn } from "../styles/LogIn.styles";
import { Form } from "../styles/LogIn.styles";
import googleIcon from "../styles/images/google-g-2015.svg";

const LogIn = () => {
  return (
    <MainLogIn>
      <h1>Log in with google</h1>

      <button className="googleBtn">
        <img className="googleImg" src={googleIcon} alt="google icon" />
      </button>

      <p>or use your username for log in:</p>
      <Form>
        <div className="inputUsername">
          <input placeholder="Username" type="text" />
        </div>
        <div className="inputPassword">
          <input placeholder="Password" type="password" />
        </div>
        <button>Log in</button>
      </Form>
      <p>
        Don't have an account? <a href="/sign-in">Sig up</a>
      </p>
    </MainLogIn>
  );
};

export default LogIn;
