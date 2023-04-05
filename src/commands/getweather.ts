import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "../lib/types";
import { EmbedBuilder } from "@discordjs/builders"
import { celsiustoFarenheit, getweatherAPI } from "../lib/util"
import Command from "../classes/commands"
const axios = require('axios')


class weatherCommand extends Command {
  public builder = new SlashCommandBuilder()
    .setName('weather')
    .setDescription('get the current weather in New York')

  async execute(interaction: Interaction) {
    var apiResponse = await getweatherAPI()

    var embed = new EmbedBuilder()
      .setTitle(`${apiResponse.location.timezone_id}`)
      .setTimestamp()
      .setThumbnail(apiResponse.current.weather_icons[0])
      .addFields(
        { name: "Temperature", value: `${celsiustoFarenheit(Number(apiResponse.current.temperature))}°F` },
        { name: "Feel", value: `${celsiustoFarenheit(Number(apiResponse.current.feelslike))}°F` },
      )

    interaction.reply({ embeds: [embed] })

  }
}


export default new weatherCommand()