import { MessageEmbed } from "discord.js";

import { CardsModel, CardsModelType } from "../db/models/CardsModel";
import { UserModel } from "../db/models/UsersModel";

import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'sell',
  description: 'Comando usado para vender suas cartas. (Só na DM)',
  aliases: ['vender'],
  usage: '<cardId(s)>',
  execute: async (message, args) => {
    if(message.channel.type !== 'dm') return;

    const embed = new MessageEmbed();

    const cardsID = args;

    let user = await UserModel.findOne({
      idUser: message.author.id,
    })

    if(!user) {
      return message.channel.send(
        `Ops! ${message.author}, eu não tenho você cadastrado nesse sistema. ` + 
        `Você precisa girar alguns pacotes de cartas para usar esse comando. 🙂`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    let allCards = await CardsModel.find({});

    if(cardsID.length === 0) {
      let totalCoins = 0

      for (let index = 0; index < user.cards.length; index++) {
        const cardId = user.cards[index];

        const card = allCards.find(item => item.idCard === cardId)

        if(!card) return;

        totalCoins += card.amount;
      }

      await UserModel.findOneAndUpdate({
        idUser: message.author.id,
      }, {
        $set: {
          coins: user.coins + totalCoins,
          cards: [],
        }
      })

      embed
        .setColor('#F4F5FA')
        .setTitle(`${message.author.username}, totas suas cartas foram vendidas com sucesso! `)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setThumbnail(String(message.author.avatarURL({ 
          dynamic: true, 
          format: "png", 
          size: 1024 
        })))
        .setDescription('Depois dessa mega venda você tem um total de:\n\n' + 
        `**${user.coins + totalCoins} DTC** <:DTC:965680653255446629>`)

      return message.channel.send(embed);
    } else {
      const cards: string[] = [];
      
      for (let index = 0; index < cardsID.length; index++) {
        const cardsSelected = user.cards.find(item => item === cardsID[index])

        cards.push(cardsSelected as string);
      }

      if(cards.every(item => item === undefined)) {
        return message.channel.send(
          'Ops! Algum id passado não foi achado no seu inventário ou não é um id válido. ' + 
          'Verifique e tente novamente.'
        ).then(msg => msg.delete({ timeout: 6000 }));
      } else {
        const cards: CardsModelType[] = [];
        let totalSell = 0;

        for (let index = 0; index < cardsID.length; index++) {
          user.cards.splice(user.cards.indexOf(cardsID[index]), 1)

          const card = allCards.find(item => item.idCard === cardsID[index]);
          if(!card) return

          totalSell += card.amount;

          cards.push(card);
        }

        await UserModel.findOneAndUpdate({
          idUser: message.author.id,
        }, {
          $set: {
            coins: user.coins + totalSell,
            cards: user.cards,
          }
        })

        embed
          .setColor('#F4F5FA')
          .setTitle(`${message.author.username}, totas as cartas abaixo foram vendidas com sucesso!`)
          .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
          .setThumbnail(String(message.author.avatarURL({ 
            dynamic: true, 
            format: "png", 
            size: 1024 
          })))
          .setDescription(cards.map(item => (
            `\n\n#${item.idCard}⠆ ${capitalizeStr(item.name)}: **${item.amount}** DTC <:DTC:965680653255446629>`
          )) + `\n\n\nTotal vendido: **${totalSell}** DTC <:DTC:965680653255446629>`)

        return message.channel.send(embed);
      }
    }
  }
}