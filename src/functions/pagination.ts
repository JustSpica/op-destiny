import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

export interface IPagination {
  embeds: MessageEmbed[];
  emojis: string[];
  timeout: number;
}

export const pagination = async (message: Message, { embeds, emojis, timeout }: IPagination) => {
  let index = 0;

  const currentyPage = await message.channel.send(
    embeds[index].setFooter(`\n📕 - Página ${index + 1} de ${embeds.length}`)
  );

  for(const emoji of emojis) await currentyPage.react(emoji);

  const filter = (reaction: MessageReaction, user: User) => {
    return emojis.includes(reaction.emoji.name) && !user.bot
  };

  const collector = currentyPage.createReactionCollector(filter, { time: timeout });

  collector.on('collect', reaction => {
    if(message.channel.type !== "dm") {
      reaction.users.remove(message.author);
    }
    
    if(reaction.emoji.name === emojis[0]) {
      index = index > 0 ? --index : 0;
    }

    if(reaction.emoji.name === emojis[1]) {
      index = index < embeds.length - 1 ? ++index : 0;
    }

    currentyPage.edit(
      embeds[index].setFooter(`\n📕 - Página ${index + 1} de ${embeds.length}`)
    )
  })

  collector.on('end', () => {
    if(message.channel.type !== "dm") {
      currentyPage.reactions.removeAll();
    }
  })

  return currentyPage;
}