import { SlashCommandBuilder, bold } from "discord.js";
import { Interaction } from "../lib/types";
import { EmbedBuilder } from "@discordjs/builders"
import { getWeatherAPI } from "../lib/util"
import Command from "../classes/commands"
import { shrug } from "../lib/constants";


class WeatherCommand extends Command {
  public builder = new SlashCommandBuilder()
    .setName('weather')
    .setDescription('get the current weather in da streets')

  async execute(interaction: Interaction) {
    await interaction.deferReply()
    try {
      const apiResponse = await getWeatherAPI()!

      if (apiResponse.success === false) {
        await interaction.editReply(`oops weather fetch failed ${shrug}
        Code: ${apiResponse.error?.code} || Reason: ${bold(`${apiResponse.error?.info}`)}`)
      } else {
        const embed = new EmbedBuilder()
          .setTitle(`${apiResponse.location?.timezone_id}`)
          .setTimestamp()
          .setThumbnail(apiResponse.current?.weather_icons[0]!)
          .setDescription(`Temperature is like around ${bold(`${Number(apiResponse.current?.temperature)}°F`)}, But feels like ${bold(`${apiResponse.current?.feelslike}°F`)} tho`)
        //.addFields(
        //  { name: "Temperature", value: `${celsiustoFarenheit(Number(apiResponse.current.temperature))}°F` },
        //  { name: "Feel", value: `${celsiustoFarenheit(Number(apiResponse.current.feelslike))}°F` },
        //)

        await interaction.editReply({ embeds: [embed] })
      }

    } catch (e) {
      console.log(e)
      await interaction.editReply(`${shrug} weather command didnt work. uh try again?`)
    }
  }
}

export default new WeatherCommand()