module.exports = (api, event, regex) => {
  api.setMessageReaction("😀", event.messageID, (e) => {}, true);
  api.sendMessage("Hello", event.threadID, (err, msg) => {
    if (err) return console.error(`ERR [Message]: ${JSON.stringify(err)}`);
    setTimeout(() => {
      api.editMessage("The server is still alive.", msg.messageID);
    }, 1000);
  });
};
