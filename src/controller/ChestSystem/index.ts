import { Message } from "discord.js";

import { CardEmbed } from "../../components/CardEmbed";

import { UserModel } from "../../db/models/UsersModel";

import { capitalizeStr } from "../../functions/capitalize";

import { getCards } from "../../utils/GetCards";
import { keysCardDrop } from "../../utils/KeysUtils";

export const ChestSystem = async (message: Message, tier: number, keyId: number) => {
  const user = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    );
  }

  if(!user.keys?.find(item => item.id === keyId)) {
    return message.channel.send(
      `${message.author}, você não possui essa key no seu inventário.`
    ).then(msg => {
      msg.delete({ timeout: 6000 })
    })
  }

  const cardTier = keysCardDrop(tier);
  const card = await getCards([cardTier]);
  const cardId = card.map(item => item.idCard);

  const keyIndex = user.keys.findIndex(item => item.id === keyId);
  const key = user.keys?.[keyIndex];
  
  user.keys.splice(keyIndex, 1);

  await UserModel.findOneAndUpdate({
    idUser: message.author.id,
  }, {
    $push: { cards: cardId },
    $set: { keys: user.keys }
  })

  card.map(item => (
    CardEmbed(message, {
      color: '#F4F5FA',
      title: `#${item.idCard} - ${capitalizeStr(item.name)}`,
      description: 
        `Anime: **${capitalizeStr(item.anime)}**\n` + 
        `Valor de venda: **${item.amount}** DTC <:DTC:965680653255446629>\n` +
        `Carta de: **${message.author.username}**`,
      linkURL: item.linkURL
    }).then(msg => {
      msg.react('<:DTC:965680653255446629>')

      return message.channel.send(
        `${message.author}, você gastou 1x ${key?.id === 1 ? 
          '<:shadeSoul:968745230985723904>' : 
          '<:vengefulSpirit:968745284379246592>'
        } **${key?.name}** do seu inventário.`
      )
    })
  ))
}