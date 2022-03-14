import { Message, MessageEmbed } from 'discord.js';

type EmbedCardProps = {
  title: string;
  description: string;
  imageUrl: string;
}

export const EmbedCard = (
  message: Message, 
  { 
    title, 
    description, 
    imageUrl 
  }: EmbedCardProps) => {
  const embed = new MessageEmbed();

  embed
    .setColor('#F4F5FA')
    .setTitle(title)
    .setDescription(description)
    .setImage(imageUrl)
  
  return message.channel.send(embed)
}