const fs = require("fs");
const core = require("./core");

const bot = new core();

bot.setOptions({
  listenEvents: true,
  selfListen: true,
});

bot.addAdmin("6156005792837061560057928370");

bot.addAdminCommand({
  name: "Sample Command",
  command: ["admin test command"],
  script: "test",
});

bot.start({
  appState: JSON.parse(fs.readFileSync("fbstate.json", "utf-8")),
});
