import { Message, MessageEmbed } from "discord.js"

export type EmbedProps = {
  color: string;
  title: string;
  description: string;
  linkURL: string;
}

export const CardEmbed = ( 
  message: Message, 
  { 
    color, 
    description, 
    linkURL, 
    title 
  }: EmbedProps) => {
    const embed = new MessageEmbed();

    embed
      .setColor(color)
      .setAuthor('Op. Destiny', 'https://i.imgur.com/lkMXyJ1.gif')
      .setTitle(title)
      .setDescription(description)
      .setImage(linkURL)

    return message.channel.send(embed)
}