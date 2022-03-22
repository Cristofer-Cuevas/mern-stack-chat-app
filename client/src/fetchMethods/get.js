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

  return fetch("http://localhost:3001", {
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
  return fetch("http://localhost:3001/chat/contacts", {
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

  return fetch(`http://localhost:3001/chat/messages/${params}/${days}`, {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};
