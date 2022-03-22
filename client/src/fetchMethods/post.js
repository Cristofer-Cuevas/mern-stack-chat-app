export const loginPost = (userCredentials) => {
  return fetch("https://mern-stack-chat-app-1.herokuapp.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userCredentials.username,
      password: userCredentials.password,
    }),
  });
};

export const signupPost = (userCredentials) => {
  return fetch("https://mern-stack-chat-app-1.herokuapp.com/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userCredentials.username,
      password: userCredentials.password,
    }),
  });
};
