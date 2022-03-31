import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  message: String,
  date: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
