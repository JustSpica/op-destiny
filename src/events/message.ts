import { Client, Message, Collection } from 'discord.js';

import { LevelSystem } from '../controller/LevelSystem'

import { prefix } from '../../config.json';

import { ICommands } from '../types';

export const event = {
  name: 'message',
  on: true,
  execute(message: Message, client: Client, commands: Collection<string, ICommands>) {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) {
      return LevelSystem(message, client);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift();

    const targetCommand = commands.get(commandName!) 
    || commands.find(cmd => cmd.aliases! && cmd.aliases.includes(commandName!));

    if(!targetCommand) {
      return message.reply('Ops! Parace que eu não possuo essa funcionalidade ainda.😔');
    }

    try {
			targetCommand.execute(message, args, client, commands)
		} catch (error) {
			console.error(error);
			message.reply('Houve um erro ao tentar executar esse comando.');
		}
  },
}