require('dotenv').config()
import { Client, GatewayIntentBits, Partials, ActivityType, Events, Collection, TextChannel } from "discord.js";
import Command from "./classes/commands";
import fs from "fs"
import path from "path";

class panthress {
  public client: Client
  public commands: Collection<string, Command>
  public bannedIds: string[] = []
  constructor(token: string) {
    console.log(token);
    this.client = new Client({
      partials: [Partials.GuildMember],
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
      presence: {
        activities: [{
          type: ActivityType.Listening,
          name: "to V to the H"
        }]
      }
    })
    this.client.once(Events.ClientReady, c => {
      this.panthressListen()
      this.panthressAdd()

      console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    this.client.login(process.env.TOKEN)
  }

  panthressAdd() {
    this.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  
    for (const file of commandFiles) {
      if (file.startsWith("_")) {
        continue;
      }
  
      const filePath = path.join(commandsPath, file);
      const command = require(filePath).default as Command;
  
      if (command instanceof Command) {
        console.log(`Added ${command.builder.name} Command`);
        this.commands.set(command.builder.name, command);
        this.client.application?.commands.create(command.builder.toJSON());
      } else {
        console.log(`[Warning] ${filePath} isn't a command class`);
      }
    }
  }
  

  panthressListen() {
    this.client.on(Events.InteractionCreate, async interaction => {
      if (this.bannedIds.includes(interaction.user.id)) {
        console.log(`banned id ${interaction.user.id} tried to use a command`)
        return
      }


      
    }
  )}

}


try {
  //console.log("token", process.env.TOKEN)
  //console.log("projectId", process.env.PROJECTID)
  console.log(process.env.npm_package_dependencies)
  global.bot = new panthress(process.env.TOKEN)
} catch (e) {
  console.error("botError", e);
}




declare global {
  var __rootdir__: string;
  var bot: panthress;
  namespace NodeJS {
    interface ProcessEnv {
      [x: string]: string;
    }
  }
}