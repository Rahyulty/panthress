import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "src/lib/types";
import Command from "../classes/commands"

class PingCommand extends Command {
  public builder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("check bot activity")

  async execute(interaction: Interaction) {
    await interaction.reply("Pong nigga")
  }
}

export default new PingCommand