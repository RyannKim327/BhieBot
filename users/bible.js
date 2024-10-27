const bible = require("biblegateway-scrape");

module.exports = async (api, event, regex) => {
  const data = await bible.verse(
    event.body.match(regex)[1],
    bible.version.ENG_KING_JAMES_VERSION,
  );

  api.sendMessage(
    `Here's your bible verse:\n*${data[0].book}*\n> ${data[0].verse.split("\n").join("\n> ")}`,
    event.threadID,
    (err, msg) => {},
  );
};
