// example command template

const { MessageEmbed } = require("discord.js")

module.exports = {
  aliases: ["latency"],
  description: "am I alive?",
  args: None,
  hidden: true,
  slash: "both",
  test: true, 
  callback: async({client, message, content, interaction}) => {
    const embed = new MessageEmbed()
    .setTitle('I\'m alive')
    .setColor(client.colour)
    .setDescription(`Latency is **${interaction? Date.now() - interaction.createdTimestamp :Date.now() - message.createdTimestamp}ms.**`)
    
    if (message){
      await message.reply({embeds: [embed]})
    } else {
      await interaction.reply({embeds: [embed]})
    }
  }
}