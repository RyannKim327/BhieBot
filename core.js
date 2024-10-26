const fca = require("chatbox-fca-remake");
const fs = require("fs");

// INFO: Middlware Imports
const command_middleware = require("./middlewares/command");

class core {
  constructor() {
    console.log("Core was initiated");

    this.__admin = [];
    this.__commands = [];
    this.__objs = { listenEvents: true };
    this.__adminId = [];
    this.__prefix = "/";
    const directory = `${__dirname}/temp`;
    if (fs.existsSync(directory)) {
      fs.rm(directory, { recursive: true }, (e) => {});
    }
    setTimeout(() => {
      fs.mkdirSync(directory);
    }, 1000);
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
     * But if any of these are not included, it is required to use the FBstate
     * or what we call the cookie to logged in to the server.
     */

    console.log("Welcome to BhieBot console side");
    try {
      const logout = fca(state, async (error, api) => {
        if (error) return console.error(`ERR [Login]: ${error.message}`);

        console.log("Initiating settings");

        api.setOptions(this.__opts);

        if (!this.__commands) {
          console.error(`ERR [Comamnds]: No comamnds existed`);
          // logout.logout();
          return;
        }

        // api.sendMessage("Test mode", "61560057928370");

        console.log("Initiating Listener");
        console.log(this.__commands);
        console.log(this.__admin);
        api.listenMqtt(async (error, event) => {
          if (error) {
            console.error(`ERR: [Listener]: ${error.message}`);
            // logout.logout();
            return;
          }

          if (event.body) {
            /*
             * NOTE: The purpose of this funciton is to check if there's a message existed
             * or new message arrived. It is to prevent the spamming caused by the account.
             */

            let executed = false;

            if (event.body.startsWith(this.__prefix)) {
              event.body = event.body.substring(1);
              if (this.__admin.length > 0) {
                let c = 0;
                const admin_command = () => {
                  console.log(`ADMIN: ${this.__admin[c]}`);
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
            }
          }
        });
      });
    } catch (e) {}
  }
}

module.exports = core;
