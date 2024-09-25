const fca = require("@xaviabot/fca-unofficial");
const fs = require("fs");

class core {
  constructor() {
    console.log("Welcome to facebook bot.");
    this.__admin = [];
    this.__commands = [];
    this.__objs = {};
    this.__adminId = [];
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

  addAdminCommand(command) {
    /*
     * TODO: To create a compilation of all admin commands.
     * Just place the path of the directory where the commands
     * can be shown, as well as the name, description and the
     * regular expression that will follow the format of the
     * command.
     */
    if (Array.isArray(command)) {
      command.forEach((v, i) => {
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
    if (Array.isArray()) {
      command.forEach((v, i) => {
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

    const logout = fca(state, (error, api) => {
      if (error) return console.error(`ERR [Login]: ${error.message}`);

      api.setOptions(this.__opts);

      if (!this.__commands) {
        console.error(`ERR [Comamnds]: No comamnds existed`);
        logout.logout();
        return;
      }

      api.listenMqtt(async (error, event) => {
        if (error) {
          console.error(`ERR: [Listener]: ${error.message}`);
          logout.logout();
          return;
        }

        if ((event, body)) {
          /*
           * NOTE: The purpose of this funciton is to check if there's a message existed
           * or new message arrived. It is to prevent the spamming caused by the account.
           */
        }
      });
    });
  }
}

module.exports = core;
