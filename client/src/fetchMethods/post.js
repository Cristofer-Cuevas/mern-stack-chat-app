export const loginPost = (userCredentials) => {
    return fetch("https://chatapp-x49l.onrender.com", {
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
// signup method
export const signupPost = (userCredentials) => {
    return fetch("https://chatapp-x49l.onrender.com/sign-up", {
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
