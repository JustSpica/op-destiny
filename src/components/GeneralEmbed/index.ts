import { Message, MessageEmbed } from 'discord.js';

export type EmbedProps = {
  color: string;
  title: string;
  description: string;
  thumb?: string;
}

export const GeneralEmbed = (
  message: Message, 
  { 
    color, 
    description, 
    thumb, 
    title 
  }: EmbedProps) => {
  const embed = new MessageEmbed();

  embed
    .setColor(color)
    .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
    .setTitle(title)
    .setDescription(description)

  return message.channel.send(embed)
}