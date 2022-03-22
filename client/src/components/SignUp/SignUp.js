import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { signupPost } from "../../fetchMethods/post";

// Styels Components
import { Form, MainLogIn } from "../styles/LogIn.styles";

const setCookie = (token) => {
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  document.cookie = `Jwt=${token}; expires=${cookieExpires}; path=/`;
};

const SignUp = () => {
  const navigate = useNavigate();
  useQuery("get auth", () => fetch("http://localhost:3001").then((res) => res.json()), {
    onSucces: (res) => {
      if (res.succes === true) {
        navigate("/chat");
      }
    },
  });
  const [formState, setFormState] = useState({});
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  const usernameInpRef = useRef(null);
  const passwordInpRef = useRef(null);

  const { mutate } = useMutation((userCredentials) => signupPost(userCredentials).then((res) => res.json()), {
    onSuccess: (res) => {
      console.log(res);
      if (res.success === true) {
        setCookie(res.token);
        navigate("/chat", { replace: true });
      }
      if (res.userExist === true) {
        setFormState({ userExist: true });
      }
    },
  });

  const handleSignupPost = (e) => {
    e.preventDefault();

    if (!usernameInpRef.current.value && !passwordInpRef.current.value) {
      setFormState({ isPasswordEmpty: true, isUsernameEmpty: true });
    } else if (!usernameInpRef.current.value) {
      setFormState({ isUsernameEmpty: true });
    } else if (!passwordInpRef.current.value) {
      setFormState({ isPasswordEmpty: true });
    } else {
      const username = usernameInpRef.current.value;
      const password = passwordInpRef.current.value;

      const userCredentials = {
        username: username,
        password: password,
      };

      mutate(userCredentials);
      setFormState({});
    }
  };

  return (
    <MainLogIn>
      <h1>Sign Up</h1>

      <Form>
        <div className="inputUsername">
          <input ref={usernameInpRef} placeholder="Username" type="text" />
          {formState?.userExist ? <p className="errorMessage">This user already exist</p> : null}
          <p className="errorMessage">{formState?.isUsernameEmpty ? "Username field cannot be empty" : null}</p>
        </div>
        <div className="inputPassword">
          <input ref={passwordInpRef} placeholder="Password" type="password" />
          <p className="errorMessage">{formState?.isUsernameEmpty ? "Username field cannot be empty" : null}</p>
        </div>
        <button onClick={handleSignupPost}>Sign Up</button>
      </Form>
      <p>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </MainLogIn>
  );
};

export default SignUp;
