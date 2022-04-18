import { MessageEmbed } from "discord.js";

import { UserModel } from '../db/models/UsersModel';

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'rank',
  description: "Mostra o TOP 5 usuários do rank do servidor",
  aliases: ['levels', 'usersRank', 'ranque'],
  execute(message, args) {
    if(message.channel.type === 'dm') return;

    const embed = new MessageEmbed();

    UserModel.find({}).sort({xp: -1}).limit(5).then(response => {
      embed
        .setColor('#F4F5FA')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setTitle('💎 Rank do Servidor 💎')
        .setDescription('Esse são os TOP 5 do servidor:')
        .addFields(response.map((item, index) => (
          {
            name: `<:statusOnline:928045571128827904> ${index + 1}º Lugar \n`,
            value: `Player: **${item.name}**\n Level: **${item.level.value}** \n XP atual: **${item.level.xp}**xp\n⠀`
          }
        )))

      message.channel.send(embed);
    })
  }
}