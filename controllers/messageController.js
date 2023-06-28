const Message = require("../models/message")

const addMessage = async (mes) => {
    const message = new Message({
        text: mes
    });
    await message.save();
}

const getMessages = async () => {
    const messages = await Message.find({});
    return messages;
}

module.exports = {addMessage, getMessages};