require('dotenv').config()
import { REST, Routes } from "discord.js";
import fs from "fs"
import path from "path";
import Command from "./classes/commands";

let commands = [];
// Grab all the command files from the commands directory you created earlier
// testing
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  if (file.startsWith("_")) {
    continue
  }
  const command = require(`./commands/${file}`).default as Command;
  if (command instanceof Command) {
    commands.push(command.builder.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands('1092808209758167060'),
      { body: commands },
    );
    // @ts-ignore
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
    }
})();


