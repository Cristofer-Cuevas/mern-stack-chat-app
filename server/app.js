import express from "express";
import passport from "passport";
import dbConnection from "./dbConnection/dbConnection.js";
import routes from "./routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
import "./auth/auth.js";
import Message from "./models/Message.schema.js";

// Socket.io
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(passport.initialize()));
io.use(wrap(passport.authenticate("jwt", { session: false })));

let newUsers = [];

io.on("connection", (socket) => {
  socket.join(socket.request.user.username);

  if (newUsers.every((user) => user !== socket.request.user.username)) {
    newUsers.push(socket.request.user.username);
    io.emit("users connected", newUsers);
  }

  socket.on("disconnect", async () => {
    console.log(socket.request.user.username);
    const matchingSockets = await io.in(socket.request.user.username).allSockets();
    const isDisconnected = matchingSockets.size === 0;

    newUsers.forEach((user, index) => {
      if (user === socket.request.user.username) {
        if (isDisconnected) {
          newUsers.splice(index, 1);
          setTimeout(() => {
            if (newUsers.every((user) => user !== socket.request.user.username)) {
              io.emit("users connected", newUsers);
            }
          }, 20000);
        }
      }
    });
  });

  socket.on("message", (data) => {
    Message.create({
      sender: socket.request.user.username,
      recipient: data.to,
      message: data.inputValue,
      date: data.date,
    });

    socket.to(data.to).emit("message", { _id: false, message: data.inputValue, date: data.date, sender: socket.request.user.username, recipient: data.to });
  });
});
dbConnection(() => {
  app.use(routes);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
