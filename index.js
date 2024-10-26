const fs = require("fs");
const core = require("./core");

const bot = new core();

bot.setOptions({
  listenEvents: true,
  selfListen: true,
});

bot.addAdmin("61560057928370");

bot.addAdminCommand({
  name: "Sample Command",
  format: "test",
  script: "test",
  type: ["message"],
});

bot.addCommand({
  name: "Music Command",
  format: "music ([\\w\\W]+)",
  script: "music",
  type: ["message"],
});

bot.start({
  appState: JSON.parse(fs.readFileSync("fbstate.json", "utf-8")),
});

module.exports = bot;
