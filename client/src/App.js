import React from "react";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp.js";
import GlobalStyes from "./components/styles/Global.styles";
import Contacts from "./components/Chat/Contacts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <GlobalStyes />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/chat/*" element={<Contacts />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
