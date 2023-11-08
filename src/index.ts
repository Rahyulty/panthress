require('dotenv').config()
import { Client, GatewayIntentBits, Partials, ActivityType, Events, Collection, GuildManager, Guild, TextChannel, EmbedBuilder, bold } from "discord.js"
import { getDetaBase, getGreeting, getWeatherAPI, getTimeOfDayMessage, daysUntilLastDayOfSchool} from "./lib/util";
import Command from "./classes/commands";
import fs from "fs"
import * as Sentry from '@sentry/node'
import cron from 'node-cron';
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
          name: "to N to the B"
        }]
      }
    })

    this.panthressListen()
    this.panthressAdd()

    this.client.once(Events.ClientReady, c => {
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
        // work now NIGGER
        // this.client.application?.commands.create(command.builder.toJSON());
      } else {
        console.log(`[Warning] ${filePath} isn't a command class`);
      }
    }
  }


  panthressListen() {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (this.bannedIds.includes(interaction.user.id)) {
        console.log(`banned id ${interaction.user.id} tried to use a command`)
        return
      }

      if (interaction.isChatInputCommand()) {
        const command = this.commands.get(interaction.commandName);
        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        } else {
          const transaction = Sentry.startTransaction({
            op: 'respondToCommand',
            name: interaction.commandName,
            data: {
              'user': interaction.user.id,
              'guild': interaction.guild?.name,
              'guildId': interaction.guildId,
              'createdAt': interaction.createdTimestamp,
              'commandParams': interaction.options.data.toString()
            }
          })
          try {
            await command.execute(interaction);
          } catch (err) {
            console.error(err);
            Sentry.captureException(err, {
              tags: {
                'user': interaction.user.id,
                'guild': interaction.guild?.name,
                'guildId': interaction.guildId,
                'createdAt': interaction.createdTimestamp,
                'command': interaction.commandName,
                'error': 'SLASH_COMMAND_EXECUTE_ERROR'
              },
            })
            let msg = 'There was an error while executing this command!'

            if (interaction.deferred) {
              await interaction.editReply({ content: msg });
            } else {
              await interaction.reply({ content: msg, ephemeral: true });
            }
          } finally {
            // transaction.finish();
          }
        }
      } else if (interaction.isAutocomplete()) {
        const command = this.commands.get(interaction.commandName);
        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        } else {
          const transaction = Sentry.startTransaction({
            op: 'autocompleteCommand',
            name: interaction.commandName,
            data: {
              'user': interaction.user.id,
              'guild': interaction.guild?.name,
              'guildId': interaction.guildId,
              'createdAt': interaction.createdTimestamp,
              'commandParams': interaction.options.data.toString()
            }
          })
          try {
            await command.autocomplete(interaction);
          } catch (err) {
            console.error(err);
            Sentry.captureException(err, {
              tags: {
                'user': interaction.user.id,
                'guild': interaction.guild?.name,
                'guildId': interaction.guildId,
                'createdAt': interaction.createdTimestamp,
                'command': interaction.commandName,
                'error': 'SLASH_COMMAND_AUTOCOMPLETE_ERROR'
              },
            })
          } finally {
            //transaction.finish();
          }
        }
      }


    }
    )
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

cron.schedule('0 6,12,21 * * *', async () => {
  // cron.schedule('*/5 * * * * *', async () => {
  const deta = getDetaBase()
  const db = await (await deta).get('servers') as any
  let data = JSON.parse(db.data)

  for (const guildId in data) {
    const channelId = data[guildId].homeChannel
    if (channelId) {
      const apiResponse = await getWeatherAPI()!
      // const newsResponse = await getNewsAPI()!
      const guildManager: GuildManager = bot.client.guilds
      const guild: Guild | undefined = guildManager.cache.get(guildId)
      const channel = guild?.channels.cache.find(
        channel => channel.id === channelId && channel instanceof TextChannel
      ) as TextChannel | undefined;

      // console.log(newsResponse)
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${getGreeting()}, ${guild?.name}. \n${getTimeOfDayMessage()}`)
        .setTimestamp()
        .setThumbnail(apiResponse.current?.weather_icons[0]!)
        .addFields(
          { name: "Temperature", value: `Temperature is currently ${bold(`${Number(apiResponse.current?.temperature)}°F`)}, But feels like ${bold(`${apiResponse.current?.feelslike}°F`)}` },
          { name: "Area", value: `Currently the area is experiencing some ${bold(`${apiResponse.current?.weather_descriptions}`)} weather` },
          { name : "Countdown till AF's Last Day of School", value : daysUntilLastDayOfSchool("AF")},
          {name : "Countdown till BTHS last Day of School", value: daysUntilLastDayOfSchool("BTHS")},
          {name : "Countdown till Midwoods last Day of School", value : daysUntilLastDayOfSchool("MD")}
        )



      await channel?.send({ embeds: [embed] })


    }
  }

}, {
  timezone: 'America/New_York'
})






declare global {
  var __rootdir__: string;
  var bot: panthress;
  namespace NodeJS {
    interface ProcessEnv {
      [x: string]: string;
    }
  }
}