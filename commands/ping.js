// example command template

const { MessageEmbed } = require("discord.js")

module.exports = {
  aliases: ["latency"],
  description: "am I alive?",
  args: null,
  hidden: true,
  slash: "both",
  test: true, 
  callback: async({client, message, content, interaction}) => {
    const embed = new MessageEmbed()
    .setTitle('I\'m alive')
    .setColor(client.colour)
    .setDescription(`Latency is **${interaction? Date.now() - interaction.createdTimestamp :Date.now() - message.createdTimestamp}ms.**`)

    if (interaction) {
      interaction.reply({embeds: [embed]}); 
    } else {
      message.reply({embeds: [embed]});
    }

  }
}
