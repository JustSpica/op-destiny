import { MessageEmbed } from "discord.js";
import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'help',
  description: 'Lista todos os comandos que podem ser utilizados',
  aliases: ['support, assistance, ajuda'],
  usage: '<command>',
  execute(message, args, _, commands) {
    if(message.channel.type === 'dm') return;

    const command = args[0];

    const embed = new MessageEmbed();
    
    if(!command) {
      embed
        .setColor('#F4F5FA')
        .setTitle('Comandos de ajuda do servidor')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
        .setDescription(
          `Opa ${message.author.username}, parece que você está um pouco perdido ` + 
          `com os meus comandos. Então aqui está uma lista completa com todos eles ` + 
          'para dar aquele help. \n\n Você também pode digitar **op!help <aqui vai o nome do comando>** ' + 
          '~~para acidentalmente comprar um NFT desvalorizado~~ ' + 
          `para você saber mais informações sobre ele. 🧐\n⠀`)
        .addFields(commands.map(item => (
          { name: `op!${item.name}`, value: `Descrição: ${item.description}\n⠀` }
        )))
      
      return message.channel.send(embed);
    }

    const targetCommand = commands.find(cmd => cmd.name === command);

    if(targetCommand) {
      embed
        .setColor('#F4F5FA')
        .setTitle(`Comando: ${capitalizeStr(targetCommand.name)}`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
        .setThumbnail('https://i.imgur.com/7A5FaAn.jpg')
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