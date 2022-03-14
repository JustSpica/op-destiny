import { Message, Client } from 'discord.js';

export interface ICommands {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (message: Message, args: string[], client: Client) => any;
}