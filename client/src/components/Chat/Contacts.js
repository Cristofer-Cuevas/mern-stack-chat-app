import React, { useEffect, useRef, useState, useCallback } from "react";
import ChatBox from "./ChatBox";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { getContacts } from "../../fetchMethods/get.js";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";

// Styles
import { Div } from "../styles/Contacts.styles.js";
import { UsersBox } from "../styles/Contacts.styles.js";
import userImage from "../styles/images/man-user-icon.png";
import threeVertDots from "../styles/images/more_vert_black_24dp.svg";
import warningIcon from "../styles/images/warning.png";

const Contacts = () => {
    const [contactsFromIo, setContactsFromIo] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [messages, setMessages] = useState(null);
    const [btnValue, setBtnValue] = useState(null);
    const [socket, setSocket] = useState(null);
    const lastMessages = useRef({});
    const messageRead = useRef({});
    const navigate = useNavigate();
    const user = useParams();
    let isUserConnected = false;
    const getInputValue = (message) => {
        socket.emit("message", { inputValue: message, to: user["*"], date: new Date() });
    };

    useEffect(() => {
        //============================================//
        // ----------------- Get Cookie as JWT ----------------- //
        let cookieValue;
        if (document.cookie) {
            cookieValue = document.cookie
                .split("; ")
                .find((row) => {
                    return row.startsWith("Jwt=");
                })
                .split("=")[1];
        }

        //============================================//
        // -------------------- Socket State --------------------- //
        const socket = io("https://chatapp-x49l.onrender.com", {
            extraHeaders: {
                Authorization: cookieValue,
            },
        });
        setSocket(socket);
        socket.on("users connected", (data) => {
            setContactsFromIo(data);
        });

        socket.on("message", (data) => {
            setMessages(data);
        });

        return () => socket.disconnect();
    }, [setSocket]);

    //============================================//
    // -------------------- Requesting users --------------------//
    const { data } = useQuery("getContacts", () => getContacts().then((res) => res.json()), {
        onSuccess: (res) => {
            console.log(data);
            if (res.success === false) {
                navigate("/");
            }
        },
        refetchOnWindowFocus: false,
    });

    //============================================//
    // ---------------------- User data ----------------------- //
    const { contacts } = useUsersList(contactsFromIo, data);

    if (contacts) {
        const userConnected = contacts.filter((contact) => contact.isConnected === true && contact.contactName === user["*"]);
        if (userConnected[0]) {
            isUserConnected = true;
        } else {
            isUserConnected = false;
        }
    }

    //============================================//
    // -------------------- Filtering users --------------------- //
    let contactsToShow;
    const filteredContact = contacts?.filter((contact) => {
        if (btnValue === "All") {
            return contacts;
        } else if (btnValue === "Offline") {
            return contact.isConnected === false;
        } else if (btnValue === "Online") {
            return contact.isConnected === true;
        } else {
            return contacts;
        }
    });

    if (filteredContact) {
        contactsToShow = filteredContact;
    }

    const getFilterBtn = (filter) => {
        setBtnValue(filter);
    };

    const handleOnInput = (e) => {
        setInputValue(e.target.value);
    };

    if (inputValue) {
        const filteredContacts = contactsToShow?.filter((contact) => contact.contactName.includes(inputValue));
        if (filteredContacts) {
            contactsToShow = filteredContacts;
        } else {
            contactsToShow = contacts;
        }
    }

    //============================================//
    // ------------ Setting message preview ------------- //
    const getUserMessage = useCallback(
        (username) => {
            if (messages?.sender === lastMessages.current[username]) {
                delete lastMessages.current[username];
                lastMessages.current[username] = {
                    username: messages?.sender,
                    message: messages?.message,
                };
            } else {
                if (messages?.sender === username) {
                    lastMessages.current[username] = {
                        username: messages?.sender,
                        message: messages?.message,
                    };
                }
            }
            // ---------- Returning p tag with the message preview ----------- //
            if (lastMessages.current[username]?.username === username) {
                return <p className="messagePreview">{lastMessages.current[username].message}</p>;
            } else {
                return null;
            }
        },
        [messages]
    );

    //============================================//
    // ----- Notify the user about new messages ------ //
    const getIfMessageIsRead = useCallback(
        (username) => {
            if (messageRead.current[user["*"]]?.username === user["*"]) {
                delete messageRead.current[user["*"]];
            } else {
                if (messages?.sender === username && user["*"] !== username && messages?.sender !== messageRead.current[username]?.username) {
                    messageRead.current[username] = {
                        username: messages?.sender,
                        isMessageRead: false,
                    };
                }
            }

            if (username === messageRead.current[username]?.username) {
                return <img className="isMessageReadImg" src={warningIcon} alt="warning" />;
            }
        },
        [messages, user]
    );

    const handleThreeDotsClick = (e) => {
        e.target.nextElementSibling.classList.toggle("showSignOutBtnContainer");
    };

    const handleSignOutClick = () => {
        // ---------- Deleting cookie ---------- //
        document.cookie = `Jwt=; expires=${new Date()};`;
        // ---------- Redirecting to login page ---------- //
        navigate("/", { replace: true });
    };

    const handleOnUserClick = () => {
        // ---------- Cleaning messages every time another user box is render ---------- //
        setMessages(null);
    };

    return (
        <Div className="contactsContainer">
            <div className="wrapper">
                <div className="search">
                    <div className="inputAndMenuContainer">
                        <input className="inputSearch" onInput={handleOnInput} type="search" placeholder="Search for people..." />

                        <img className="threeDotIcon" onClick={handleThreeDotsClick} src={threeVertDots} alt="three dots" />

                        <div className="signOutBtnContainer">
                            <p className="loginInfo">
                                Logged In as: <span className="userLoggedInName">{data?.user}</span>
                            </p>
                            <button onClick={handleSignOutClick} className="signOutBtn">
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <nav>
                        <Button getFilterBtn={getFilterBtn} filter={"All"}></Button>
                        <Button getFilterBtn={getFilterBtn} filter={"Online"}></Button>
                        <Button getFilterBtn={getFilterBtn} filter={"Offline"}></Button>
                    </nav>
                </div>

                <div>
                    <h2 className="title">Contacts</h2>
                    {!contactsToShow ? (
                        <p>Loading...</p>
                    ) : (
                        <UsersBox>
                            {contactsToShow?.map((contact, index) => {
                                return (
                                    <Link onClick={handleOnUserClick} to={contact?.contactName} key={index}>
                                        <div className="userBox">
                                            <div className="userImageContainer">
                                                {contact?.isConnected ? <span className="online"></span> : <span className="offline"></span>}
                                                <img className="userImage" src={userImage} alt="user-icon" />
                                            </div>
                                            <div className="usernameAndMessages">
                                                <span className="userName">{contact?.contactName}</span>
                                                {getUserMessage(contact?.contactName) ?? <p className="messagePreview">{contact?.message}</p>}
                                            </div>
                                            <div className="isMessageReadContainer">{getIfMessageIsRead(contact.contactName)}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </UsersBox>
                    )}
                </div>
            </div>
            <Routes>
                <Route path=":username" element={<ChatBox messages={messages} getInputValue={getInputValue} isUserConnected={isUserConnected} setMessages={setMessages} />} />
            </Routes>
        </Div>
    );
};

const Button = ({ filter, getFilterBtn }) => {
    const filterBtn = useRef(null);

    const onClickFilterBtn = (e) => {
        Array.from(e.target.parentElement.children).forEach((btn) => {
            btn.classList.remove("btnClicked");
            e.target.classList.add("btnClicked");
        });

        getFilterBtn(e.target.value);
    };

    return (
        <button ref={filterBtn} onClick={onClickFilterBtn} className="filterBtn" value={filter}>
            {filter}
        </button>
    );
};

const useUsersList = (contactsFromIo, data) => {
    const [contactsToShow, setContactsToShow] = useState([]);

    useEffect(() => {
        let contacts = [];

        if (data && contactsFromIo) {
            for (let data2 of data?.contacts) {
                //============================================//
                // ------------- If the user is connected -------------- //
                if (contactsFromIo && contactsFromIo.some((contact) => contact === data2.username)) {
                    contacts.push({ contactName: data2.username, message: data2.message, isConnected: true });
                    //============================================//
                    // --------- Else the user is Disconnected ---------- //
                } else {
                    contacts.push({ contactName: data2.username, message: data2.message, isConnected: false });
                }
            }
        }
        //==========================================================//
        // Setting contactsToShow only when the array is fully iterated //
        if (contacts?.length === data?.contacts?.length) {
            setContactsToShow(contacts);
        }
    }, [data, contactsFromIo]);

    if (contactsToShow.length === data?.contacts?.length) {
        return { contacts: contactsToShow };
    } else {
        return false;
    }
};

export default Contacts;
