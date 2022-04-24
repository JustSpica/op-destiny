import { 
  Client, 
  MessageEmbed, 
  MessageReaction, 
  PartialUser, 
  TextChannel, 
  User 
} from 'discord.js';
import { CardsModel } from '../../db/models/CardsModel';

import { UserModel } from '../../db/models/UsersModel';

import { capitalizeStr } from '../../functions/capitalize';

import { getCards } from '../../utils/GetCards';
import { getTiers } from '../../utils/GetTiers';

export const DropInterval = async (client: Client) => {
  const channel = await client.channels.fetch('967649490326650920') as TextChannel;
  
  setInterval(async () => {
    const embed = new MessageEmbed();

    const tier = getTiers(1);
    const cards = await getCards(tier);

    cards.map(async item => {
      embed
        .setColor('#F4F5FA')
        .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
        .setTitle(`#${item.idCard} - Nova carta sorteada`)
        .setDescription(
          `Nome: **${capitalizeStr(item.name)}**\n` +
          `Anime: **${capitalizeStr(item.anime)}**\n` + 
          `Valor de venda: **${item.amount}** DTC <:DTC:965680653255446629>`,
        )
        .setImage(`${item.linkURL}`);

        return channel.send(embed).then(msg => {
          msg.react('<:mojiYes:923960886325026827>')
          msg.delete({ timeout: 60000 * 4.99 })
        })
    })
  }, 60000 * 5)

  client.on('messageReactionAdd', 
    async (reaction: MessageReaction, user: User | PartialUser) => {
      if(user.bot) return;

      if(reaction.emoji.name !== 'mojiYes') return

      if(reaction.count === 1 && !reaction.users.cache.last()?.bot) {
        return reaction.remove();
      }

      const count = reaction.message.reactions.cache.find(
        item => item.count! <= 1
      );

      if(!count) {
        reaction.remove();
      }

      const idCard = reaction.message.embeds[0].title?.slice(1, 4);

      const card = await CardsModel.findOne({
        idCard: idCard,
      })

      const userActive = await UserModel.findOne({
        idUser: user.id
      })

      if(!userActive) {
        return reaction.message.channel.send(
          `${user}, você ainda não girou nenhum pacote de cartas, então não tenho você no sistema.\n` + 
          `De uma olhada nas opções disponíveis com o comando **op!dropList**. 😊`
        ).then(msg => msg.delete({ timeout: 6000 }));
      }

      await UserModel.findOneAndUpdate({
        idUser: user.id
      }, {
        $push: { cards: idCard }
      })

      return channel.send(
        `✨ **${user.username}** adquiriu o card **#${card?.idCard} ${capitalizeStr(String(card?.name))}** ✨`
      )
    }
  )
}