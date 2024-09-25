const core = require("./core");

const bot = new core();

bot.setOptions({
  listenEvents: true,
  selfListen: true,
});
