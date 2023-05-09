// import { SlashCommandBuilder, bold } from "discord.js";
// import { Interaction } from "../lib/types";
// import { EmbedBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders"
// import { getWeatherAPI, getNewsAPI} from "../lib/util"
// import Command from "../classes/commands"
// import { shrug } from "../lib/constants";


// class NewsCommand extends Command {
//     public builder = new SlashCommandBuilder()
//         .setName('news')
//         .setDescription('get the current and most pressing news in da world')
    
//     async execute(interaction: Interaction) {
//         await interaction.deferReply()
//         try {
//             const apiResponse = await getNewsAPI()!
            
//             if (apiResponse) {
//                 const embed = new EmbedBuilder()
//                     .setTitle(`{}`)
//             }
//         }
//     }
// }