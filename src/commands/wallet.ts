import { MessageEmbed } from "discord.js";

import { UserModel, IUserModel } from '../db/models/UsersModel';

import { triggerGreeting } from "../utils/Strings/Greeting";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'wallet',
  description: "Usado para mostrar suas finanças no servidor.",
  aliases: ['myLevel', 'userRank', 'meuRanque'],
  execute: async (message, args) => {
    const embed = new MessageEmbed();

    const users: IUserModel[] = await UserModel.find({}).sort({ level : -1})

    const user = users.find(item => item.idUser === message.author.id);
    const index = users.findIndex(item => item.idUser === message.author.id);

    const shadeKeys = user?.keys?.filter(item => item.id === 1);
    const spiritKeys = user?.keys?.filter(item => item.id === 2);

    if(!user) {
      return message.channel.send('Ops! Não consegui achar você no rank do servidor. ' + 
      'Tente interagir um pouco mais nos canais. 😊').then(msg => msg.delete({ timeout: 6000 }));
    }

    embed
      .setColor('#F4F5FA')
      .setTitle(triggerGreeting(message.author.username))
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setThumbnail(String(message.author.avatarURL({ 
        dynamic: true, 
        format: "png", 
        size: 1024 
      })))
      .setDescription(
        `🌟 Atualmente você está na ${index + 1}º posição do servidor. 🌟\n\n` + 
        `Seu xp atual é de: **${user.level.xp}xp**.\n\n` + 
        `Seus Destiny coins: **${user.coins}** DTC <:DTC:965680653255446629>\n\n` +
        `${user.keys?.length !== 0 ? 'Essas são todas as suas chaves: \n\n' + 
          `${shadeKeys?.length !== 0 ? 
            `<:shadeSoul:968745230985723904> **( ${shadeKeys?.length} )** = **${shadeKeys?.[0].name}**` : 
            '' 
          }\n` + 
          `${spiritKeys?.length !== 0 ? 
            `<:vengefulSpirit:968745284379246592> **( ${spiritKeys?.length} )** = **${spiritKeys?.[0].name}**` : 
            '' 
          }`
          : ''
        }`
      )

    return message.channel.send(embed);
  }
}