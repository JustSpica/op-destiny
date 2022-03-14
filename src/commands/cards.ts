import { MessageEmbed } from 'discord.js';

import { CardModel, GachaObjectType } from "../db/models/CardModel";
import { UserGachaModel } from "../db/models/UserGachaModel";

import { capitalizeStr } from "../functions/capitalize";

import { EmbedCard } from '../components/EmbedCard'

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'cards',
  description: "",
  aliases: ['myCards'],
  usage: '<cardIndex>',
  execute: async (message, args) => {
    const embed = new MessageEmbed();
    
    if(message.channel.type !== 'dm') return

    let userGacha = await UserGachaModel.findOne({
      userId: message.author.id,
    })

    if(!userGacha) return;

    const myCards: GachaObjectType[]  = [];

    for (let index = 0; index < userGacha.cards.length; index++) {
      let cards = await CardModel.find({
        _id: userGacha.cards[index]
      });

      myCards.push(cards[0]);
    }

    const cardID = Number(args[0])

    if(!cardID) {
      embed
        .setColor('#F4F5FA')
        .setTitle(`😊 Essas são suas cartas ${message.author.username}`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
        .setThumbnail(String(message.author.avatarURL({ 
          dynamic: true, 
          format: "png", 
          size: 1024 
        })))
        .setDescription('Utilize `op!cards <id>` para ver e vender uma carta.'+ 
          myCards.map((item, index) => (
            `\n\n#${index + 1}⠆ ${capitalizeStr(item.name)}: **${item.amount}**xp points <:ByteCoins:950614195290898464>`
          ))
        )

      return message.channel.send(embed);
    } 
    const card = myCards[cardID - 1]

    if(card) {
      EmbedCard(message, {
        title: capitalizeStr(card.name),
        description: `Anime: **${capitalizeStr(card.anime)}**\n` + 
        `Xp points: **${card.amount}** <:ByteCoins:950614195290898464>`,
        imageUrl: card.link
      }).then(msg => {
        msg.react('<:ByteCoins:950614195290898464>')
      })
    } else {
      message.channel.send('Não consegui achar a sua carta com o ID informado.')
        .then(msg => msg.delete({ timeout: 8000 }));
    }
  }
}