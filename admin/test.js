module.exports = (api, event, regex) => {
  api.sendMessage("Sent", event.threadID, (err, msg) => {
    if (err) return console.error(`ERR [Message]: ${JSON.stringify(err)}`);
  });
};
