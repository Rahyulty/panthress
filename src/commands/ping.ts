import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "../lib/types";
import Command from "../classes/commands"

class Pingcommand extends Command {
  public builder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('check if the bot is active')

    async execute(interaction: Interaction) {
      await interaction.reply('pong!')
    }
}


export default new Pingcommand()