const bot = require("./../index");

module.exports = async (api, event, regex) => {
  const commands = bot.getAllCommands();
  const user = await api.getUserInfo(event.senderID);
  let message = `Greetings, ${user[event.senderID]["name"]}, Nyx has only ${commands.length} commands and here they are:\n\n`;
  for (const c in commands) {
    const command = commands[c];
    message += `${parseInt(c) + 1}. *${command.name}*\n -> ${command.description ?? "No description provided"}\nCommand Format: ${bot.getPrefix()}${command.format} \nMessage Types: ${command.type ? command.type.join(", ") : "message"} \n`;
  }

  api.sendMessage(
    {
      body: message,
      mentions: [
        {
          id: event.senderID,
          tag: user[event.senderID]["name"],
        },
      ],
    },
    event.threadID,
    (error, m) => {
      if (error) return console.error(`Help [ERR]: ${error.error}`);
    },
  );
};
