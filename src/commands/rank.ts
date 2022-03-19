import { MessageEmbed } from "discord.js";

import { LevelModel } from "../db/models/LevelModel";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'rank',
  description: "Mostra o TOP 5 usuários do rank do servidor",
  aliases: ['levels', 'usersRank', 'ranque'],
  execute(message, args) {
    if(message.channel.type === 'dm') return;

    const embed = new MessageEmbed();

    LevelModel.find({}).sort({xp: -1}).limit(5).then(response => {
      embed
        .setColor('#F4F5FA')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
        .setTitle('💎 Rank do Servidor 💎')
        .setDescription('Esse são os TOP 5 do servidor:')
        .addFields(response.map((item, index) => (
          {
            name: `<:statusOnline:928045571128827904> ${index + 1}º Lugar \n`,
            value: `Player: **${item.userName}**\n Level: **${item.level}** \n XP atual: **${item.xp}**xp\n⠀`
          }
        )))

      message.channel.send(embed);
    })
  }
}