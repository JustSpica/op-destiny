import { MessageEmbed } from "discord.js";
import { CardEmbed } from "../components/CardEmbed";

import { CardsModel, CardsModelType } from "../db/models/CardsModel";
import { UsersDropModel } from "../db/models/UsersDropModel";
import { capitalizeStr } from "../functions/capitalize";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'cards',
  description: 
    "Lista todas as cartas que você possui." + 
    "Para vender suas cartas informe o(s) id(s) da(s) carta(s) que deseja vender separados.",
  aliases: ['myCards'],
  usage: '<cardIndex>',
  execute: async (message, args) => {
    if(message.channel.type !== 'dm') return;

    const embed = new MessageEmbed()

    let userActive = await UsersDropModel.findOne({
      userId: message.author.id,
    })

    if(!userActive) {
      return message.channel.send(
        `Ops! ${message.author}, eu não tenho você cadastrado nesse sistema. ` + 
        `Você precisa girar alguns pacotes de cartas para usar esse comando. 🙂`
      ).then(msg => msg.delete({ timeout: 10000 }));
    }

    let allCards = await CardsModel.find({})

    if(args.length === 0) {
      const cardsArr: CardsModelType[]  = [];

      for (let index = 0; index < userActive.cards.length; index++) {
        const cardSelected = allCards.find(item => 
          item.idCard === userActive?.cards[index]
        )

        cardsArr.push(cardSelected!);
      }

      if(cardsArr.length === 0) {
        embed
          .setColor('#F4F5FA')
          .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
          .setThumbnail(String(message.author.avatarURL({ 
            dynamic: true, 
            format: "png", 
            size: 1024 
          })))
          .setDescription(
            `Opa ${message.author}, você não possui nenhuma carta no seu inventário. ` + 
            `Experimente girar algum pacote para conseguir mais cartas. 🙂`
          )

        return message.channel.send(embed);
      }

      embed
        .setColor('#F4F5FA')
        .setTitle(`Essas são suas cartas ${message.author.username} 😊`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/7A5FaAn.jpg')
        .setThumbnail(String(message.author.avatarURL({ 
          dynamic: true, 
          format: "png", 
          size: 1024 
        })))
        .setDescription('Utilize `op!cards <id(s)>` para vender uma carta pelo meu valor.'+ 
          cardsArr.map(item => (
            `\n\n#${item.idCard}⠆ ${capitalizeStr(item.name)}: **${item.amount}** xp points  <:ByteCoins:950614195290898464>`
          ))
        )

      return message.channel.send(embed);
    }

    const cards = args.map(idCard => {
      const newId = userActive?.cards.find(item => item === idCard);
     
      if(!newId) return;
      
      const cardSelected = allCards.find(item => item.idCard === newId)

      return cardSelected as CardsModelType;
    })

    if(!cards.every(item => item !== undefined)) {
      return message.channel.send(
        `Ops! Algum id passado não foi achado na sua lista ou não é um id válido. Verifique e tente novamente.`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    cards.map(item => {
      CardEmbed(message, { 
        color: '#F4F5FA', 
        title: `#${item?.idCard} - ${capitalizeStr(String(item?.name))}`,
        description: 
          `Anime: **${capitalizeStr(String(item?.name))}**\n` + 
          `Valor de venda: **${item?.amount}** xp points  <:ByteCoins:950614195290898464>`,
        linkURL: String(item?.linkURL)
      }).then(msg => msg.react('<:ByteCoins:950614195290898464>'))
    })
  }
}