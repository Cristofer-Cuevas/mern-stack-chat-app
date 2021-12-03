import React from "react";
import LogIn from "./components/LogIn/Login";
import SingIn from "./components/SignIn/SignIn";
import GlobalStyes from "./components/styles/Global.styles";

function App() {
  return (
    <>
      <GlobalStyes />
      <LogIn />
      {/* <SingIn /> */}
    </>
  );
}

export default App;
