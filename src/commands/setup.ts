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
      // make it required
        .setDescription('the channel you want daily messages to be sent to')
        .setRequired(true))

  async execute(interaction: Interaction) {
    const channel = interaction.options.getChannel('channel')
    const guildId = interaction.guildId?.toString() as string;
    const deta = getDetaBase()
    const db = await (await deta).get('servers') as any;
    let data = JSON.parse(db.data)

    if (!data[guildId]) {
      data[guildId] = { homeChannel: channel?.id ?? null }
      await (await deta).put({ key: 'servers', data: JSON.stringify(data) })
      await interaction.reply('Guild setup complete')
      return
    }

    await interaction.reply('Guild already setup')
  }
}

export default new SetupCommand()
