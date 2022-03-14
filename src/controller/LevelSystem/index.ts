import { Client, Message, TextChannel, RoleResolvable } from 'discord.js';

import { LevelModel } from '../../db/models/LevelModel'
import { LevelUpEmbed } from '../../components/EmbedLevelUp'

import mock from './mock';

export const LevelSystem = async (message: Message, client: Client) => {
  const { guild } = message;
  const channelLevelUp = client.channels.cache.find(
    item => item.id === '943246401440198656',
  ) as TextChannel;
   
  let rank = await LevelModel.findOne({
    userId: message.author.id
  });

  if(!rank) {
    return rank = LevelModel.create({
      userName: message.author.username,
      userId: message.author.id,
      level: 1,
      xp: 0,
      lastMessage: Date.now(),
    })
  };

  //Faz a verificação se já passou 35seg (evitar spam)
  if(Date.now() - rank.lastMessage > 35000) {
    let level = rank.level;
    let xp = rank.xp;
    
    const nextLevelObject = mock.find(item => item.level === level + 1);
    const xpNextLevel = nextLevelObject ? nextLevelObject?.xpBase : 0;
    const randomXp = Math.floor((Math.random() * (10 - 4 + 1) + 4));

    xp += Math.floor(randomXp * mock[level - 1].xpMultiplicator! || 1);
    
    console.log(`xp: ${xp} xpNivel: ${xpNextLevel}`)

    if(xp >= xpNextLevel && level !== 5) {
      level++;

      const newRole = guild?.roles.cache.find(item => {
        return item.name === `Level ${level}`;
      });
      message.member?.roles.add(newRole as RoleResolvable);

      const { embed } = LevelUpEmbed(message.author, level, xp);

      channelLevelUp.send(embed);
    };

    rank = await LevelModel.findOneAndUpdate(
      {
        userId: message.author.id,
      },
      {
        $set: {
          level,
          xp,
          lastMessage: Date.now(),
        }
      },
      {
        new: true,
      }
    );
  };
}