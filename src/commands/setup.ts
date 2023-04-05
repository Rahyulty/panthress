import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "../lib/types";
import { getDetaBase } from "../lib/util";
import { EmbedBuilder } from "@discordjs/builders"
import Command from "../classes/commands";



class SetupCommand extends Command {
  public builder = new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Lets get started in getting your daily messages!')
    .addChannelOption(option => 
      option.setName('channel')
        .setDescription('the channel you want daily messages to be sent to'))
    async execute(interaction: Interaction) {
      const db = getDetaBase()
      const rawDB = (await db).get('pnth-data')
      console.log(rawDB)
      await interaction.reply('working on it man')
      
    }

}

export default new SetupCommand()