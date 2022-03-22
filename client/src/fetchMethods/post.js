export const loginPost = (userCredentials) => {
  return fetch("http://localhost:3001", {
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
  return fetch("http://localhost:3001/sign-up", {
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
