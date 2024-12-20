const fs = require("fs");
const core = require("./core");

const bot = new core();

bot.setOptions({
  listenEvents: true,
  selfListen: true,
});

bot.addAdmin("61560057928370");

bot.addAdminCommand({
  name: "Check Command",
  format: "check",
  script: "check",
});

bot.addCommand({
  name: "Help Command",
  format: "help",
  script: "help",
});

bot.addCommand({
  name: "Bible Command",
  description: "A command where it can send bible verse requests",
  format: "verse ([\\w\\W]+)",
  script: "bible",
  type: ["message"],
});

bot.addCommand({
  name: "Music Command",
  description: "A music bot command powered by Youtube platform.",
  format: "music ([\\w\\W]+)",
  script: "music",
  type: ["message"],
});

bot.start({
  appState: JSON.parse(fs.readFileSync("fbstate.json", "utf-8")),
});

module.exports = bot;
