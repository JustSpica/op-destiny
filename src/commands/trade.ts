import { TradeSystem } from "../controller/TradeSystem";

import { ICommands } from "../types";

export const command: ICommands = {
  name: 'trade',
  description: 'Comando usado para abrir uma trade com um usuário especifico',
  aliases: ['trocar'],
  usage: '<userToTrade> <cardId> <amount>',
  execute: async (message, args, client) => {
    if(message.channel.type === 'dm') return;

    /* if(message.channel.id !== '967114395958276186') return; */
    
    const idUserTarget = args[0].slice(2).replace('>', '');
    const idCard = args[1];
    const amount = Number(args[2]);

    TradeSystem(message, client, { amount, idCard, idUserTarget })

    /* const card = await CardsModel.findOne({
      idCard: idCard,
    })

    if(!card) {
      return message.channel.send(
        `🤖 *Biip Boop*. Ops! ${message.author}, parece que você está tentando ` + 
        `adquirir uma carta que não existe... Espera como isso é possivel ? 🤔`
      ).then(msg => msg.delete({ timeout: 8000 })); 
    }

    const userReceive = await UserModel.findOne({
      idUser: message.author.id,
    })

    if(!userReceive) return;

    const userTarget = await UserModel.findOne({
      idUser: idUserTarget,
    })

    if(!userTarget) {
      return message.channel.send(
        `🤖 *Biip Boop*. Ops! ${message.author}, esse usuário não está cadastrado no meu sistema.`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    if(!userTarget?.cards.find(item => item === idCard)) {
      return message.channel.send(
        `${message.author}, esse usuário não possui essa carta no inventário. 😶`
      ).then(msg => msg.delete({ timeout: 6000 }));
    }

    const userTargetDiscord = await message.guild?.members.fetch(idUserTarget)

    message.channel.send(
      `Trade criada com sucesso para: ${userTargetDiscord?.user}`
    ).then(async () => {
      const embed = new MessageEmbed();

      embed.
        setColor('#F4F5FA')
        .setTitle(`Trade criada por ${message.author.username} com sucesso!`)
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setDescription(
          `Card: **#${idCard} ${capitalizeStr(card.name)}**\n\n` + 
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

        if(reaction.emoji.name === '❌') {
          return reaction.message.reactions.removeAll();
        } 

        if(reaction.emoji.name === '✅') {
          if(!reaction.message.embeds[0]) return;

          const idCard = reaction.message.embeds[0].description?.slice(9, 12);

          console.log(idCard);
        }
      }
    ) */
  }
}