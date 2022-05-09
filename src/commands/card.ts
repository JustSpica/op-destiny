import { MessageEmbed } from "discord.js";
import { CardEmbed } from "../components/CardEmbed";
import { CardsModel } from "../db/models/CardsModel";
import { capitalizeStr } from "../functions/capitalize";
import { ICommands } from "../types";

export const command: ICommands = {
  name: 'card',
  description: 'Mostra as informações do card selecionado',
  aliases: ['cr', 'carta'],
  execute: async (message, args) => {
    const name = args[0];

    if(!name) return;

    const allCards = await CardsModel.find({});
    const cards = allCards.filter(item => 
      item.name.includes(name.toLocaleLowerCase()));

    if(!cards) {
      return message.channel.send(
        `Ops! Não achei nenhum card com o nome informado. 😖` 
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    if(cards.length > 1) {
      const embed = new MessageEmbed();

      embed
        .setColor('#F4F5FA')
        .setTitle('🔍 Essas foram as cartas que eu encontrei 🔎')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setThumbnail('https://i.imgur.com/lkMXyJ1.gif')
        .setDescription('Por favor para saber mais sobre uma carta, especifique o nome dela um pouco mais.' + 
          `${cards.map((item, index) => (
            `\n\n#${index}: ${capitalizeStr(item.name)} - **${item.amount}** DTC <:DTC:965680653255446629>`
          ))}`
        )

      return message.channel.send(embed);
    } else {
      return CardEmbed(message, {
        color: '#F4F5FA', 
        title: `#${cards[0].idCard} - ${capitalizeStr(String(cards[0].name))}`,
        description: 
          `Anime: **${capitalizeStr(String(cards[0].anime))}**\n` + 
          `Valor de venda: **${cards[0].amount}** DTC <:DTC:965680653255446629>`,
        linkURL: String(cards[0].linkURL)
      })
    }
  }
}