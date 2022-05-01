import { MessageEmbed } from "discord.js";

import { capitalizeStr } from "../functions/capitalize";
import { pagination } from "../functions/pagination";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'help',
  description: 'Lista todos os comandos que podem ser utilizados',
  aliases: ['support, assistance, ajuda'],
  usage: '<command>',
  execute(message, args, _, commands) {
    if(message.channel.type === 'dm') return;

    const command = args[0];

    if(!command) {
      const embeds: MessageEmbed[] = [];

      const commandsArr = commands.map(item => item);

      for (let index = 0; index < commandsArr.length; index = index + 5) {
        const embed = new MessageEmbed();

        const commandsPage = commandsArr.slice(index, index + 5)

        if(index === 0) {
          embed
            .setColor('#F4F5FA')
            .setTitle('Comandos de ajuda do servidor')
            .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
            .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
            .setDescription(
              `Opa ${message.author.username}, parece que você está um pouco perdido ` + 
              `com os meus comandos. Então aqui está uma lista completa com todos eles ` + 
              'para dar aquele help. \n\n Você também pode digitar **op!help <command>** ' + 
              '~~para acidentalmente comprar um NFT desvalorizado~~ ' + 
              `para você saber mais informações sobre ele. 🧐\n⠀`)
            .addFields(commandsPage.map(item => (
              { name: `op!${item.name}`, value: `${item.description}\n⠀` }
            )))
        } else {
          embed
            .setColor('#F4F5FA')
            .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
            .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
            .setDescription('')
            .addFields(commandsPage.map(item => (
              { name: `op!${item.name}`, value: `${item.description}\n⠀` }
            )))
        }

        embeds.push(embed);
      }

      return pagination(message, 
        { embeds, emojis: ['◀', '▶'], timeout: 60000 * 2 }
      );
    }

    const targetCommand = commands.find(cmd => cmd.name === command);

    if(targetCommand) {
      const embed = new MessageEmbed();

      embed
        .setColor('#F4F5FA')
        .setTitle(`Comando: ${capitalizeStr(targetCommand.name)}`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
        .setDescription(
          `Descrição: ${targetCommand.description}\n\n` + 
          `Outro jeito de chamar esse comando: \`${targetCommand.aliases?.join(', ')}\`` + 
          `${targetCommand.usage ? `\n\nForma alternativa de usar: op!${targetCommand.name} ${targetCommand.usage}` : ``}`
        )
      
      return message.channel.send(embed);
    } else {
      message.channel.send(
        'Ops! Infelizmente não consegui achar esse comando na minha lista 😞'
      ).then(msg => msg.delete({ timeout: 8000 }));
    }
  }
}