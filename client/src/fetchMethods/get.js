export const getAuth = () => {
  let cookieValue;

  if (document.cookie) {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => {
        return row.startsWith("Jwt=");
      })
      .split("=")[1];
  }

  return fetch("https://mern-stack-chat-app-1.herokuapp.com", {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};

//Getting contacts
export const getContacts = () => {
  let cookieValue;

  if (document.cookie) {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => {
        return row.startsWith("Jwt=");
      })
      .split("=")[1];
  }
  return fetch("https://mern-stack-chat-app-1.herokuapp.com/chat/contacts", {
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};

// Getting Messages

export const getMessages = (params, days) => {
  let cookieValue;

  if (document.cookie) {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => {
        return row.startsWith("Jwt=");
      })
      .split("=")[1];
  }

  return fetch(`https://mern-stack-chat-app-1.herokuapp.com/chat/messages/${params}/${days}`, {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};
