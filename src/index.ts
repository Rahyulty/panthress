require('dotenv').config()
import { Client, GatewayIntentBits, Partials, ActivityType, Events, Collection, TextChannel } from "discord.js";
import Command from "./classes/commands";

class panthress {
  public client: Client
  public commands: Collection<string, Command>
  public bannedIds: string[] = []
  constructor(token: string){
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
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    
    this.client.login(process.env.TOKEN)
  }

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