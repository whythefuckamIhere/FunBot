const { Intents, Client, Collection, Interaction } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

const botIntents = [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS];

const client = new Client({ intents: botIntents });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  /*
    command handler (?)
  */

  //maybe add a changable prefix later
  client.prefix = process.env.Prefix;
  //maybe a changable color too
  client.colour = "#1f1e33";


  client.commands = new Collection();
  const test_guild = client.guilds.cache.get("873759652192600075")
  const test_slash_commands = test_guild.commands
  const slash_commands = client.application.commands


  const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

  for (const file of commandFiles){

    // remembering each command
    const command = require(`./commands/${file}`);

    if (!command.hasOwnProperty("description") || !command.hasOwnProperty("slash")) throw Error("jeez at least tell me the description and the slash command info! o(≧口≦)o")

    client.commands.set(file.replace(".js", ""), command);

    if (command.aliases){
      for (const alias of command.aliases) {
        client.commands.set(alias, command);
      }
    }

    // make slash commands
    if (command.slash === "both" || command.slash){
      if(command.test) {

        test_slash_commands.create({
          name: file.replace(".js", ""),
          description: command.description,
          options: command.options
        })

      } else {

        slash_commands.create({
          name: file.replace(".js", ""),
          description: command.description,
          options: command.options
        })

      }
    }
  }


});

dotenv.config();

client.login(process.env.TOKEN);





/*
  actually processing commands
*/

client.on("messageCreate", async (message) => {
  if (message.author.id === client.user.id) return

  if(!message.content.startsWith(client.prefix))return
  const command = message.content.split(" ").shift().replace(client.prefix, "")

  if (client.commands.has(command)){
    client.commands.get(command).callback({message: message, content: message.content, client: client})
  }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()){
    return
  }

  if (client.commands.has(interaction.commandName)){
    client.commands.get(interaction.commandName).callback({interaction: interaction, client: client})
  }

})