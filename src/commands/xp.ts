import { MessageEmbed, RoleResolvable } from "discord.js";

import { UserModel } from "../db/models/UsersModel";

import mock from "../controller/LevelSystem/mock";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'xp',
  description: 'Comando usado para converter seus DTC em xp. (Pode ser usado na dm)',
  aliases: ['convert', 'change' ,'changeToXp'],
  usage: '<amount>',
  execute: async (message, args) => {
    const coinsDTC = Number(args[0]);

    if(!coinsDTC) return;

    let user = await UserModel.findOne({
      idUser: message.author.id,
    });

    if(!user) {
      return message.channel.send(
        `Ops! ${message.author}, eu não tenho você cadastrado nesse sistema. ` + 
        `Você precisa girar alguns pacotes de cartas para usar esse comando. 🙂`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    if(user.coins < coinsDTC) {
      return message.channel.send(
        `Ops! ${message.author}, você ainda não é tão rico para converter mais do ` + 
        `que você tem na sua conta. 😶\n` + `Seu total é de: **${user.coins}** DTC <:DTC:965680653255446629>`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    const embed = new MessageEmbed();

    let { value, xp } = user.level
    const xpToAdd = Math.floor((1000 * coinsDTC) / 2750);
    const newXp = xp + xpToAdd;

    mock.map(item => {
      if(item.level <= value) return;

      if(newXp >= item.xpToThisLevel) {
        value = item.level
      }
    })

    const newRole = message.guild?.roles.cache.find(item => {
      return item.name === `Level ${value}`;
    });

    message.member?.roles.add(newRole as RoleResolvable);

    await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $set: {
        coins: user.coins - coinsDTC,
        level: {
          value,
          xp: newXp,
        }
      }
    })

    embed
      .setColor('#F4F5FA')
      .setTitle(`DTC's convertidos com sucesso!`)
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setThumbnail(String(message.author.avatarURL({ 
        dynamic: true, 
        format: "png", 
        size: 1024 
      })))
      .setDescription(
        `${message.author}, você acabou de converter um total de **${coinsDTC}** DTC <:DTC:965680653255446629>.` + 
        `\n\nSeu xp atual ficou em: **${newXp}xp**` + 
        `\n\nVocê ainda possui um total de: **${user.coins - coinsDTC}** DTC <:DTC:965680653255446629>` + 
        `${value > user.level.value ? `\n\nOpa, parece que com essa troca você acabou de upar para o **LEVEL ${value}** 🥳🎉` : ''}`
      )

    return message.channel.send(embed);
  }
}