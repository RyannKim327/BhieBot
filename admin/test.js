module.exports = (api, event, regex) => {
  api.setMessageReaction("😀", event.messageID, (e) => { }, true);
  api.sendMessage("Sent", event.threadID, (err, msg) => {
    if (err) return console.error(`ERR [Message]: ${JSON.stringify(err)}`);

    api.editMessage("Hello", msg.messageID);
  });
};
