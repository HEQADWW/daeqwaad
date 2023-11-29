const { Message, ChannelType, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "setup",
  aliases: ["setmusic", "setup"],
  description: `สร้างห้องลิ้งเพลง`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.ManageChannels,
  category: "Settings",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: false,
  djOnly: false,

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
    let channel = await client.music.get(`${message.guild.id}.music.channel`);
    let oldChannel = message.guild.channels.cache.get(channel);
    if (oldChannel) {
      return client.embed(
        message,
        `** ${client.config.emoji.ERROR} Music Request Channel already Setup in ${oldChannel} Delete first and Setup Again **`
      );
    } else {
      message.guild.channels
        .create({
          name: `🎧・SonicSync`,
          type: ChannelType.GuildText,
          rateLimitPerUser: 3,
          reason: `for music bot`,
          topic: `ช่องทางขอเพลงสำหรับ ${client.user.username}, พิมพ์ชื่อเพลงหรือลิงก์เพื่อเล่นเพลง`,
        })
        .then(async (ch) => {
          await ch
            .send({ embeds: [client.queueembed(message.guild)] })
            .then(async (queuemsg) => {
              await ch
                .send({
                  embeds: [client.playembed(message.guild)],
                  components: [client.buttons(true)],
                })
                .then(async (playmsg) => {
                  await client.music.set(`${message.guild.id}.music`, {
                    channel: ch.id,
                    pmsg: playmsg.id,
                    qmsg: queuemsg.id,
                  });
                  client.embed(
                    message,
                    `${client.config.emoji.SUCCESS} Successfully Setup Music System in ${ch}`
                  );
                });
            });
        });
    }
  },
};
