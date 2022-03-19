import React, { useState, useEffect, useRef } from "react";
import Contacts from "./Contacts";
import { useParams } from "react-router-dom";
// import NavBar from "./NavBar";
// import ChatBox from "./ChatBox";
// import Discussions from "./Discussions";
// import useQuery from "react-query";
// import { getContacts } from "../../fetchMethods/get";
// import { IsAuth } from "../../fetchMethods/get";

// Styles
import { Main } from "../styles/Chat.styles";

// Socket.io
import io from "socket.io-client";

const Chat = () => {
  const user = useParams();
  const [messages, setMessages] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [socket, setSocket] = useState(null);

  const getInputValue = (message) => {
    socket.emit("message", { inputValue: message, to: user["*"], date: new Date() });
  };

  useEffect(() => {
    let cookieValue;

    if (document.cookie) {
      cookieValue = document.cookie
        .split("; ")
        .find((row) => {
          return row.startsWith("Jwt=");
        })
        .split("=")[1];
    }

    const socket = io("http://localhost:3001", {
      extraHeaders: {
        Authorization: cookieValue,
      },
    });

    setSocket(socket);

    socket.on("users connected", (data) => {
      setContacts(data);
    });

    socket.on("message", (data) => {
      setMessages(data);
    });

    console.log("setting socket executed");

    return () => socket.disconnect();
  }, [setSocket]);

  return (
    <Main>
      <section className="routes">
        <Contacts messages={messages} contacts={contacts} setMessages={setMessages} getInputValue={getInputValue} />
      </section>
    </Main>
  );
};

export default Chat;
