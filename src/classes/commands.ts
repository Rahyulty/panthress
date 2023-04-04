import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Autocomplete, Interaction } from "../lib/types";

export default abstract class Command {
  public builder: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder
  constructor() {}
  
  abstract execute(interaction: Interaction): Promise<void> 
  
  autocomplete(interaction: Autocomplete) {}
}
