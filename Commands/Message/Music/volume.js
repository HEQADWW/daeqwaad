const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  description: `เปลี่ยนระดับเสียงของคิวปัจจุบัน`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    let volume = Number(args[0]);
    if (!volume) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} กรุณาระบุเสียง %`
      );
    } else if (volume > 250) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} ระบุจำนวนเสียงระหว่าง 1 - 250  !!`
      );
    } else {
      await queue.setVolume(volume);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} ระดับเสียง ตั้งเป็น ${queue.volume}% !!`
      );
    }
  },
};
