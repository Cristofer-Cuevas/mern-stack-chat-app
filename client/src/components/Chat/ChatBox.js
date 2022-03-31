import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages } from "../../fetchMethods/get";
import { Section } from "../styles/ChatBox.styles";
import sendIcon from "../styles/images/send_black_24dp.svg";
import userIcon from "../styles/images/man-user-icon.png";
import goBackIcon from "../styles/images/outline_arrow_back_ios_black_24dp.png";

const ChatBox = (props) => {
  const setMessages = props.setMessages;
  const messagesEndRef = useRef(null);
  const [data, setData] = useState(null);
  const messages = props.messages;
  const { username } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const docsRef = useRef(0);

  const scrollToBottom = (behavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior: behavior });
  };
  //====================================================//
  // ----------- Adding a new message sent locally ----------- //
  const onSendMessageClick = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      props.getInputValue(inputRef.current.value);
      const message = { _id: null, recipient: username, message: inputRef.current.value, username, sender: data.requester, date: new Date() };
      setData((data) => {
        return { messages: [...data.messages, message], requester: data.requester };
      });
    }
    setTimeout(() => {
      scrollToBottom("smooth");
    }, 1);
    inputRef.current.value = "";
  };

  //============================================//
  // ---------------- Requesting Messages ---------------- //
  useEffect(() => {
    (async () => {
      await getMessages(username)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(res);
          scrollToBottom("auto");
        });
    })();

    // Delete all messages from array everytime another user is re-render //
    return () => {
      setData((data) => {
        return { messages: [...data.messages.splice()], requester: data.requester };
      });
    };
  }, [username]);

  //===============================================//
  // ------ Adding new message coming from io ------- //
  useEffect(() => {
    console.log(messages);
    if (messages && messages.sender === username) {
      setData((data) => {
        return { messages: [...data?.messages, messages], requester: data.requester };
      });
    }
    setTimeout(() => {
      scrollToBottom("smooth");
    }, 1);
  }, [messages, setMessages, username]);

  //============================================//
  // ------------ Request 5 more messages ------------ //
  const onRequestMessagesClick = (e) => {
    e.preventDefault();

    docsRef.current += 5;

    (async () => {
      await getMessages(username, docsRef.current)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData((data) => {
            return { messages: [...res.messages, ...data.messages], requester: data.requester };
          });
        });
    })();
  };

  const handleGoBackClickIcon = (e) => {
    e.preventDefault();
    navigate("/chat", { replace: true });
  };

  return (
    <Section className="chatBox">
      <div className="userInfo">
        <div className="goBackIconContainer">
          <button onClick={handleGoBackClickIcon}>
            <img className="goBackIcon" src={goBackIcon} alt="arrow back" />
          </button>
        </div>{" "}
        <div className="usernameAndImageContainer">
          <div className="userImageContainer">
            {props.isUserConnected ? <span className="online"></span> : <span className="offline"></span>}
            <img className="userImg" src={userIcon} alt="user-icon" />
          </div>
          <div className="userNameAndStatus">
            <span className="userName">{username}</span>

            {props.isUserConnected ? <span className="status">Online</span> : <span className="status">Offline</span>}
          </div>
        </div>
      </div>

      <div className="chatContainer">
        {!data ? null : (
          <div className="messagesUl">
            {data?.messages.length > 0 ? (
              <button className="requestMessages" onClick={onRequestMessagesClick}>
                Request More Messages
              </button>
            ) : (
              <p className="requestMessages" style={{ color: "purple" }}>
                Don't be shy, start chatting!
              </p>
            )}{" "}
            {data.messages.map((message, index) => {
              const date = new Date(message.date);
              const time = date.getHours() + ":" + date.getMinutes();

              return message.sender === data.requester ? (
                <div key={message._id || index} className="messageContainer me">
                  <div className="messageAndDateContainerMe">
                    <p className="message">{message.message}</p>
                    <span className="date">{time}</span>
                  </div>
                </div>
              ) : (
                <div key={message._id || index} className="messageContainer">
                  <div className="imgContainer">
                    <img className="userImg" src={userIcon} alt="user" />
                  </div>
                  <div className="messageAndDateContainer">
                    <p className="message">{message.message}</p>
                    <span className="date">{time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>
        )}
      </div>

      <form className="inputContainer">
        <input placeholder="Start typing to chat" ref={inputRef} type="text" className="input" />
        <button onClick={onSendMessageClick} className="iconSend">
          <img src={sendIcon} alt="send" />
        </button>
      </form>
    </Section>
  );
};

export default ChatBox;
