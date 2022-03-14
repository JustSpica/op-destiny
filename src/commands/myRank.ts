import { MessageEmbed } from "discord.js";

import { LevelModel, LevelModelType } from "../db/models/LevelModel";

import { triggerGreeting } from "../utils/Strings/Greeting";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'myRank',
  description: "Mostra seu rank no servidor",
  aliases: ['myLevel', 'userRank', 'meuRanque'],
  execute: async (message, args) => {
    const embed = new MessageEmbed();

    const users: LevelModelType[] = await LevelModel.find({}).sort({xp: -1})

    const user = users.find(item => item.userName === message.author.username);
    const index = users.findIndex(item => item.userName === message.author.username);

    if(!user) {
      return message.channel.send('Ops! Não consegui achar você no rank do servidor. ' + 
      'Tente interagir um pouco mais nos canais. 😊').then(msg => msg.delete({ timeout: 10000 }));
    }

    embed
      .setColor('#F4F5FA')
      .setTitle(triggerGreeting(message.author.username))
      .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
      .setThumbnail(String(message.author.avatarURL({ 
        dynamic: true, 
        format: "png", 
        size: 1024 
      })))
      .setDescription(
        `Atualmente você está na **${index + 1}º posição** do servidor ` + 
        `com **${user.xp}xp points**.\n\n Continue interagindo com a galera pra aumentar seus pontos 😀.`
      )

    return message.channel.send(embed);
  }
}