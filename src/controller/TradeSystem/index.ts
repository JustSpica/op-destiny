import { 
  Client, 
  Message, 
  MessageEmbed,
   MessageReaction, 
   PartialUser, 
   User 
} from "discord.js";
import { v4 } from 'uuid';

import { capitalizeStr } from "../../functions/capitalize";

import { CardsModel } from "../../db/models/CardsModel";
import { UserModel } from "../../db/models/UsersModel";
import { TradesModel } from "../../db/models/TradesModel";

interface ITrade {
  idCard: string;
  idUserTarget: string;
  amount: number;
}

export const TradeSystem = async (
  message: Message, client: Client, { amount, idCard, idUserTarget }: ITrade
) => {
  const userTarget = await UserModel.findOne({
    idUser: idUserTarget,
  });

  if(!userTarget) {
    return message.channel.send(
      `🤖 *Biip Boop*. Ops! ${message.author}, esse usuário não está cadastrado no meu sistema.`
    ).then(msg => msg.delete({ timeout: 6000 }));
  }

  const card = await CardsModel.findOne({
     idCard: idCard,
  })

  if(!card) {
    return message.channel.send(
      `🤖 *Biip Boop*. Ops! ${message.author}, parece que você está tentando ` + 
      `adquirir uma carta que não existe... Espera como isso é possivel ? 🤔`
    ).then(msg => msg.delete({ timeout: 8000 })); 
  }

  if(!userTarget.cards.find(item => item === card.idCard)) {
    return message.channel.send(
      `${message.author}, esse usuário não possui essa carta no inventário. 😶`
    ).then(msg => msg.delete({ timeout: 6000 }));
  }

  const userTargetDiscord = await message.guild?.members.fetch(idUserTarget)

  const tradeID = v4().slice(0, 8);

  await TradesModel.create({
    idTrade: tradeID,
    idCard: card.idCard,
    buyerUser: {
      name: message.author.username,
      id: message.author.id,
    },
    vendorUser: {
      name: userTarget.name,
      id: userTarget.idUser
    },
    amount: amount
  })

  message.channel.send(
    `Trade criada com sucesso para: ${userTargetDiscord?.user}`
  ).then(async () => {
    const embed = new MessageEmbed();

    embed
      .setColor('#F4F5FA')
      .setTitle(`#${tradeID} Trade criada com sucesso!`)
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setDescription(
        `${message.author.username}, acabou de abrir uma trade para o card **#${idCard} ${capitalizeStr(card.name)}** ` +
        `no valor de: **${amount}** DTC <:DTC:965680653255446629>\n\n` +
        `Dono do card: ${userTargetDiscord?.user}\n\n` +
        `Valor de venda para Destiny: **${card.amount}** DTC <:DTC:965680653255446629>`
      )

    return message.channel.send(embed).then(msg => {
      msg.react('✅');
      msg.react('❌');
    });
  })

  client.on('messageReactionAdd', 
    async (reaction: MessageReaction, user: User | PartialUser) => {
      if(user.bot) return;

      if(!reaction.message.embeds[0]) return;

      const idTrade = reaction.message.embeds[0].title?.slice(1, 9)

      const trade = await TradesModel.findOne({
        idTrade: idTrade,
      })

      if(!trade) return;

      if(user.id !== trade.vendorUser.id) {
        return reaction.users.remove(user.id);
      }

      if(reaction.emoji.name === '❌') {

        await TradesModel.findOneAndDelete({
          idTrade: idTrade
        })

        return reaction.message.reactions.removeAll();
      }

      if(reaction.emoji.name === '✅') {
        const userVendor = await UserModel.findOne({
          idUser: trade.vendorUser.id,
        })

        const userBuyer = await UserModel.findOne({
          idUser: trade.buyerUser.id,
        })

        if(!userBuyer) return;

        if(userBuyer.coins < trade.amount) {
          return message.channel.send(
            `Ops!, o usuário ${userBuyer.name} não tem DTC's suficientes para ` + 
            `finalizar essa troca.`
          ).then(msg => {
            reaction.users.remove(user.id);
            msg.delete({ timeout: 6000 })
          })
        }

        if(!userVendor?.cards.find(item => item === trade.idCard)) {
          return message.channel.send(
            `${user}, você não possui mais essa carta no inventário.`
          ).then(msg => {
            reaction.users.remove(user.id);
            msg.delete({ timeout: 6000 })
          });
        }

        userVendor.cards.splice(userVendor.cards.indexOf(trade.idCard), 1)

        await UserModel.findOneAndUpdate({
          idUser: userVendor.idUser
        }, {
          $set: {
            cards: userVendor.cards,
            coins: userVendor.coins + trade.amount
          }
        })

        await UserModel.findOneAndUpdate({
          idUser: userBuyer.idUser
        }, {
          $push: {
            cards: trade.idCard
          },
          $set: {
            coins: userBuyer.coins - trade.amount
          }
        })

        await TradesModel.findOneAndDelete({
          idTrade: idTrade
        })

        return message.channel.send(
          `🌟Trade finalizada entre **${userBuyer.name}** e **${userVendor.name}** ` + 
          `pelo card de id **#${trade.idCard}** pelo valor de **${trade.amount}** DTC <:DTC:965680653255446629>.`
        ).then(() => {
          reaction.message.reactions.removeAll();
        })
      }
    }
  )
}