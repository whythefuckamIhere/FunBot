const discord = require("discord.js");

module.exports = {
  aliases: [],
  description: "delete slash command",
  args: "<slash command>",
  hidden: true,
  slash: "both",
  options: [
    {
      name: 'slash_command',
      description: "name or id of the slash command",
      required: true,
      type: discord.Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  test: false,
  callback: async ({client, message, interaction, content}) => {
    
    if (message){
      const guild = message.guild

      const command = guild.commands.cache.find(c => c.id === content[0] || c.name === content[0]);
      
      if (!command) {
        message.reply("slash command not found")

        return
      }

      if (command.name === "slash") {
        
        message.reply("cannot remove slash command")
        

        return
      }
      
      await command.delete()

      message.reply("slash command removed for this guild")
      
    }

    if (interaction){
      const guild = interaction.guild

      const command = guild.commands.cache.find(c => c.id === interaction.options.getString || interaction.options.getString);
      
      if (!command) {
        interaction.reply("slash command not found")

        return
      }

      if (command.name === "slash") {
        
          interaction.reply("cannot remove slash command")
        

        return
      }
      
      await command.delete()

      interaction.reply("slash command removed for this guild")  
    }
  } 
}
