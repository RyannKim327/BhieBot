const fca = require("chatbox-fca-remake");
const fs = require("fs");

// INFO: Middlware Imports
const command_middleware = require("./middlewares/command");

class core {
  constructor() {
    this.__admin = [];
    this.__commands = [];
    this.__objs = { listenEvents: true };
    this.__adminId = [];
    this.__prefix = ":";

    // TODO: Prevent the full storage of the server or to clean the dumps every server refresh
    const directory = `${__dirname}/temp`;
    if (fs.existsSync(directory)) {
      fs.rm(directory, { recursive: true }, (e) => {});
    }
    setTimeout(() => {
      fs.mkdirSync(directory);
    }, 1000);
    console.log("Core was initiated");
  }

  setOptions(opts) {
    if (Object.keys(opts).length <= 0) {
      opts = {
        listenEvents: true,
        selfListen: false,
      };
    }
    this.__opts = opts;
  }

  setPrefix(pref) {
    this.__prefix = pref;
  }

  addAdmin(id) {
    if (Array.isArray(id)) {
      id.forEach((v) => {
        this.__adminId.push(v);
      });
      return;
    }
    this.__adminId.push(id);
  }

  addAdminCommand(command) {
    /*
     * TODO: To create a compilation of all admin commands.
     * Just place the path of the directory where the commands
     * can be shown, as well as the name, description and the
     * regular expression that will follow the format of the
     * command.
     */

    if (typeof command === "string") {
      command = JSON.parse(command);
    }
    if (Array.isArray(command)) {
      command.forEach((v) => {
        this.__admin.push(v);
      });
      return console.log(
        `INFO [Admin Commands]: The commands added successfully`,
      );
    }
    if (Object.keys(command).length <= 0)
      return console.error(
        `ERR [Admin Command]: The command ${command} is invalid`,
      );
    this.__admin.push(command);
  }

  addCommand(command) {
    /*
     * TODO: To create a compilation of all user's commands.
     * Just to place the path of the directory where the commands
     * can be shown, as well as the name description and the
     * regular expression that will follow the format of the command.
     */
    if (typeof command === "string") {
      command = JSON.parse(command);
    }
    if (Array.isArray()) {
      command.forEach((v) => {
        this.__commands.push(v);
      });
      return console.log(
        `INFO [User command]: The commands added successfully.`,
      );
    }
    if (Object.keys(command).length <= 0)
      return console.error(
        `ERR [User command]: The command ${command} is invalid`,
      );
    this.__commands.push(command);
  }

  start(state) {
    /*
     * NOTE: This state consists of JSON data of any of these information
     * Username or Email
     * Password
     *
     * NOTE: But if any of these are not included, it is required to use the FBstate
     * or what we call the cookie to logged in to the server.
     */

    console.log("Welcome to BhieBot console side");
    try {
      fca(state, async (error, api) => {
        if (error) return console.error(`ERR [Login]: ${error.message}`);

        console.log("Initiating settings");
        api.setOptions(this.__opts);

        if (!this.__commands) {
          return console.error(`ERR [Comamnds]: No comamnds existed`);
        }

        let isListen = true;
        console.log("Initiating Listener");

        api.listenMqtt(async (error, event) => {
          if (isListen) {
            // TODO: To execute the log once and avoid loops
            console.log("Listener is now executed.");
            isListen = false;
          }
          if (error) {
            return console.error(`ERR: [Listener]: ${error.message}`);
          }

          if (event.body) {
            /*
             * NOTE: The purpose of this funciton is to check if there's a message existed
             * or new message arrived. It is to prevent the spamming caused by the account.
             */

            // TODO: A boolean that will identify if there's any command executed to prevent the flooding of commands.
            let executed = false;

            if (event.body.startsWith(this.__prefix)) {
              // TODO: TO check the message if this is command or not
              // If this starts with a prefix, the code below will automatically eliminate the prefix
              event.body = event.body.substring(this.__prefix.length);
              if (
                this.__admin.length > 0 &&
                this.__adminId.includes(event.senderID)
              ) {
                // INFO: Admin commands
                let c = 0;
                const admin_command = () => {
                  if (!this.__admin[c].type) {
                    this.__admin[c].type = ["message"];
                  }
                  const a = require(`./admin/${this.__admin[c].script}`);
                  const b = command_middleware(a);
                  if (!b(api, event, this.__admin[c])) {
                    if (c < this.__admin.length - 1) {
                      c++;

                      if (!executed) {
                        admin_command();
                      }
                    }
                  } else {
                    executed = true;
                  }
                };
                if (!executed) {
                  admin_command();
                }
              }
              if (this.__commands.length <= 0 && !executed) {
                return api.sendMessage(
                  "There's no registed command here",
                  event.threadID,
                  (e, m) => {},
                );
              }
              let c = 0;
              const _command = () => {
                // INFO: Normal user's commands
                if (!this.__commands[c].type) {
                  this.__commands[c].type = ["message"];
                }
                const a = require(`./users/${this.__commands[c].script}`);
                const b = command_middleware(a);
                if (!b(api, event, this.__commands[c])) {
                  if (c < this.__commands.length - 1) {
                    c++;

                    if (!executed) {
                      _command();
                    }
                  }
                } else {
                  executed = true;
                }
              };
              if (!executed) {
                _command();
              }
              if (!executed) {
                // NOTE: If the text doesn't matched with any of the commands, the ai will be the endpoint.
                const ai = require("./auto/ai");
                ai(api, event);
              }
            }
          }
        });
      });
    } catch (e) {
      console.error(`Login [ERR]: ${e.message}`);
    }
  }
}

module.exports = core;
