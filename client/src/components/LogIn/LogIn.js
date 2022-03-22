import React, { useEffect, useRef } from "react";
import { MainLogIn } from "../styles/LogIn.styles";
import { Form } from "../styles/LogIn.styles";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { loginPost } from "../../fetchMethods/post";
import { getAuth } from "../../fetchMethods/get";

const setCookie = (token) => {
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  document.cookie = `Jwt=${token}; expires=${cookieExpires}; path=/`;
};

const LogIn = () => {
  const navigate = useNavigate();
  useQuery("get auth", () => getAuth().then((res) => res.json()), {
    onSuccess: (res) => {
      if (res.success === true) {
        navigate("/chat", { replace: true });
      }
    },
  });
  const cookieExpires = new Date();

  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  const usernameInpRef = useRef(null);
  const passwordInpRef = useRef(null);
  const { mutate, data, reset } = useMutation((userCredentials) => loginPost(userCredentials).then((res) => res.json()), {
    onSuccess: (res) => {
      console.log(res);
      if (res.success === true) {
        setCookie(res.token);
        navigate("/chat", { replace: true });
      }
    },
  });

  useEffect(() => {
    usernameInpRef.current.oninput = () => {
      reset();
    };

    passwordInpRef.current.oninput = () => {
      reset();
    };
  }, [usernameInpRef, passwordInpRef, reset]);

  const onClickLoginBtn = (e) => {
    e.preventDefault();
    const usernameInpValue = usernameInpRef.current.value;
    const passwordInpValue = passwordInpRef.current.value;

    const userCredentials = {
      username: usernameInpValue,
      password: passwordInpValue,
    };

    mutate(userCredentials);
  };

  return (
    <MainLogIn>
      <h1>Log in form</h1>

      <Form>
        <div className="inputUsername">
          <input ref={usernameInpRef} placeholder="Username" type="text" />

          <p className="errorMessage">{data ? (data.isUsernameEmpty ? "Username field cannot be empty" : data.userNotFound ? "User Not Found" : null) : null}</p>
        </div>

        <div className="inputPassword">
          <input ref={passwordInpRef} placeholder="Password" type="password" />

          <p className="errorMessage">{data ? (data.isPasswordEmpty ? "Password field cannot be empty" : data.wrongPassword ? "Incorrect Password" : null) : null}</p>
        </div>

        <button onClick={onClickLoginBtn}>Log in</button>
      </Form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </MainLogIn>
  );
};

export default LogIn;
