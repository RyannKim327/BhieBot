const fs = require("fs");
const { G4F } = require("g4f");
const gpt = new G4F();

module.exports = async (api, event) => {
  const name = `${__dirname}/../temp/gpt.json`;
  let json = {};
  if (fs.existsSync(name)) {
    // TODO: This will help to store the past messages from the users
    // NOTE: If the server reloaded, the data would be reset.
    json = JSON.parse(fs.readFileSync(name, "utf8"));
  }
  if (json[event.senderID] == undefined) {
    const user = await api.getUserInfo(event.senderID);
    // TODO: To create an initial data where the AI will based in.
    json[event.senderID] = [
      {
        role: "system",
        content:
          "Pretend to be the girlfriend of RyannKim327, and you named as Nyx. You're also a programmer focuses on web and android development.",
      },
      {
        role: "user",
        content:
          "Hello, pretend to be the girlfriend of Ryann Kim Sesgundo. By the way, don't take those things too serious, you may also be clingy to others and to joke as well.",
      },
      {
        role: "assistant",
        content: `Hello ${user[event.senderID]["name"]} how are you. By the way my name is Nyx I pretend as the girlfriend of Ryann Kim Sesgundo, which commonly known as "RyannKim327" or "MPOP (Master Piece of Paper)" and sometimes called him "RySes" and also your friendly facebook bot. I focuses on programming related topics such as web development and android development.`,
      },
    ];
  }

  let reply = "";
  if (event.type === "message_reply") {
    // INFO: To have an access from the reply from other users
    const sender = await api.getUserInfo(event.messageReply.senderID);
    reply = `\nSaid by ${sender[event.messageReply.senderID]["name"]}\n> ${event.messageReply.body}`;
  }

  json[event.senderID].push({
    role: "user",
    content: `${event.body} ${reply}`,
  });

  gpt
    .chatCompletion(json[event.senderID], {
      provider: gpt.providers.GPT,
      model: "gpt-4",
    })
    .then((res) => {
      api.sendMessage(
        ` ${res}`,
        event.threadID,
        (err, msg) => {
          if (err) return console.error(`AI [ERR]: ${err.message}`);
          json[event.senderID].push({
            role: "assistant",
            content: res,
          });
          fs.writeFileSync(name, JSON.stringify(json), "utf8");
        },
        event.messageID,
      );
    });
};
