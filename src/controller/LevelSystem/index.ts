import { Client, Message, TextChannel, RoleResolvable, MessageEmbed } from 'discord.js';

import { UserModel } from '../../db/models/UsersModel';

import { randomNumbers } from '../../functions/randomNumbers';

import mock from './mock';

export const LevelSystem = async (message: Message, client: Client) => {
  const { guild } = message;

  const channelLevelUp = client.channels.cache.find(
    item => item.id === '943246401440198656',
  ) as TextChannel;

  let user = await UserModel.findOne({
    idUser: message.author.id,
  });

  if(!user) {
    return UserModel.create({
      idUser: message.author.id,
      name: message.author.username,
      cards: [],
      coins: 0,
      level: {
        value: 1,
        xp: 0,
        timestamp: Date.now(),
      },
      timestamp: Date.now() - 86400000,
    })
  }

  //Faz a verificação se já passou 30seg (evitar spam)
  if(Date.now() - user.level.timestamp > 30000) {
    let level = user.level.value;
    let xp = user.level.xp;
    
    const nextLevel = mock.find(item => item.level === level + 1);

    const xpToNextLevel = nextLevel ? nextLevel.xpToThisLevel : null;

    const randomXp = randomNumbers(5, 50);
    
    if(xpToNextLevel && xp >= xpToNextLevel) {
      const embed = new MessageEmbed();

      level++;

      const newRole = guild?.roles.cache.find(item => {
        return item.name === `Level ${level}`;
      });
      message.member?.roles.add(newRole as RoleResolvable);

      embed
        .setColor('#F4F5FA')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setTitle(`🎉 Level Up de ${message.author} 🎉`)
        .setDescription(
          `Parabéns ${message.author}, você acabou de upar no servidor para o **Level ${level}**\n`+
          `Seu xp atual é de: **${xp}xp**`)
      
      channelLevelUp.send(embed);
    };

    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $set: {
        level: {
          value: level,
          xp: xp + randomXp,
          timestamp: Date.now()
        }
      }
    })
  };
}