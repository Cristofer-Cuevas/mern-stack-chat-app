import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  message: String,
  date: String,

  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
