const { Innertube, UniversalCache, Utils } = require("youtubei.js");
const fs = require("fs");

module.exports = async (api, event, regex) => {
  process.env["NTBA_FIX_350"] = 1;

  api.sendMessage("Processing Data...", event.threadID, async (err, msg) => {
    if (err) return console.error(`Music Command [ERR]: ${err.message}`);

    try {
      const yt = await Innertube.create({
        cache: new UniversalCache(false),
        generate_session_locally: true,
      });
      let search = event.body.match(regex)[1];
      if (search) {
        if (search.startsWith("http")) {
          if (search.includes("youtube.com")) {
            search = search.substring("youtube.com/watch?v=".length);
            if (search.includes("&")) {
              search = search.split("&")[0];
            }
          } else if (search.includes("youtu.be")) {
            search = search.startsWith("youtu.be/".length);
            if (search.includes("?")) {
              search = search.split("?")[0];
            }
          }
        }

        const send = async (sender = 1) => {
          const result = await yt.music.search(search, {
            type: "video",
          });

          const info = await result.contents;
          let i = 0;
          let details = info[i];

          while (!details) {
            i++;
            details = info[i];
          }

          while (details.type != "MusicShelf") {
            i++;
            details = info[i];
          }

          details = details.contents[0];
          const name = `${__dirname}/../temp/${details.title} - ${details.authors[0].name} - ${event.senderID}.mp3`;
          const file = fs.createWriteStream(name);

          api.editMessage(
            `Found [INFO]: ${details.title} - ${details.authors[0].name}`,
            msg.messageID,
          );

          const stream = await yt.download(details.id, {
            type: "audio",
            quality: "bestefficiency",
            format: "mp4",
            client: "YTMUSIC",
          });

          for await (const chunk of Utils.streamToIterable(stream)) {
            file.write(chunk);
          }

          api.sendMessage(
            {
              attachment: fs.createReadStream(name).on("end", () => {
                if (fs.existsSync(name)) {
                  fs.unlink(name, (err) => {});
                  api.editMessage(
                    `Found [SUCCESS]: ${details.title} - ${details.authors[0].name}`,
                    msg.messageID,
                  );
                }
              }),
            },
            event.threadID,
            (err, msg) => {
              if (err) api.editMessage(`Music Command [ERR]: ${err.message}`);
            },
            msg.messageID,
          );
        };
        send();
      } else {
        api.editMessage(
          `Music Command [ERR]: Something went wrong with the pattern.`,
          msg.messageID,
        );
      }
    } catch (e) {
      api.editMessage(`Music Command [ERR]: ${e.message}`, msg.messageID);
    }
  });
};
