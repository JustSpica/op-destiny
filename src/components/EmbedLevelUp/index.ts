import { MessageEmbed, User } from 'discord.js';

export const LevelUpEmbed = (user: User, level: number, xp: number) => {
  const embed = new MessageEmbed();

  embed
    .setColor('#E0211E')
    .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
    .setTitle(`🎉  | Level Up de ${user.username} |  🎉`)
    .setDescription(`Parabéns ${user}, você acabou de upar no servidor para ` + 
    `o **LEVEL ${level}**<:zeroLove:913270574623645716>\n XP Atual: **${xp}xp**.`
    );

  return { embed };
}