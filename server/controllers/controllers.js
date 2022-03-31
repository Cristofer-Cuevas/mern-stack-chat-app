import User from "../models/User.js";
import issueJwt from "../lib/jwtUtils.js";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import Message from "../models/Message.schema.js";

const controllers = {};

// Get Messages
controllers.getMessages = async (req, res) => {
  const { recipient } = req.params;

  const { username } = req.user;

  const daysMultiplier = req.params.days;

  let docsToSkip = 0;

  if (daysMultiplier != "undefined") {
    docsToSkip = parseInt(daysMultiplier, 10);
  }

  const messages = await Message.find({
    $or: [
      { sender: username, recipient: recipient },
      { sender: recipient, recipient: username },
    ],
  })
    .sort({ _id: -1 })
    .skip(docsToSkip)
    .limit(5);

  // Sorting the array of messages by the date. To the oldest to the newest.

  messages.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  res.json({ messages: messages, requester: username });
};

controllers.getContacts = async (req, res) => {
  try {
    const usernameAndLastMessage = [];

    const contactsFromDB = await User.find({ username: { $ne: req.user.username } }, "username -_id");

    for (let contact of contactsFromDB) {
      const message = await Message.find(
        {
          $or: [
            { sender: contact.username, recipient: req.user.username },
            { sender: req.user.username, recipient: contact.username },
          ],
        },
        "-id"
      )
        .sort({ _id: -1 })
        .limit(1);

      if (contact.username === message[0]?.recipient || contact.username === message[0]?.sender) {
        usernameAndLastMessage.push({ username: contact.username, message: message[0]?.message });
      } else {
        usernameAndLastMessage.push({ username: contact.username, message: undefined });
      }
    }

    res.json({ contacts: usernameAndLastMessage, user: req.user.username });
  } catch (e) {
    console.log(e);
  }
};

// If username and password are undefined
const inpValidation = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username && !password) {
    res.json({ isUsernameEmpty: true, isPasswordEmpty: true });
    return true;
  } else if (!username) {
    res.json({ isUsernameEmpty: true });
    return true;
  } else if (!password) {
    res.json({ isPasswordEmpty: true });
    return true;
  }
};

// LOG IN AND SIGN UP LOGIC

controllers.validationGet = (req, res) => {
  res.json({ success: true });
};

controllers.failureRouteGet = (req, res) => {
  res.json({ success: false });
};

controllers.loginPost = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!inpValidation(req, res)) {
    User.findOne({ username: username }, (err, user) => {
      if (err) res.json({ err: "An internal error has occured" });

      if (!user) {
        res.json({ userNotFound: true });
      } else {
        const isValid = validatePassword(password, user.hash, user.salt);
        if (isValid) {
          const token = issueJwt(user._id);
          res.json({ success: true, token: token.token });
        } else {
          res.json({ wrongPassword: true });
        }
      }
    });
  }
};

//Sign up controller
controllers.signupPost = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!inpValidation(req, res))
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.json({ success: false });
      } else if (user) {
        res.json({ userExist: true });
      }

      if (!user) {
        const hashSalt = genPassword(password);
        User.create({ username: username, salt: hashSalt.salt, hash: hashSalt.hash }, (err, user) => {
          if (err) {
            res.json({ success: false });
          }
          //Next logic to send the jwt to the client
          if (user) {
            const token = issueJwt(user._id);
            res.json({ token: token.token, success: true });
          }
        });
      }
    });
};

export default controllers;
