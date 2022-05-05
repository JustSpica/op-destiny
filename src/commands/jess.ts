import { ICommands } from "../types";

export const command: ICommands = {
  name: 'jess',
  description: 'Me faça mandar uma mensagem para a Jess 😀',
  execute(message, args) {
    const jessID = "292297065365766144";
    const messageToSend = args.join(' ');

    const user = message.guild?.members.cache.find(item => item.id === jessID);

    if(!messageToSend || messageToSend === '') return;

    if(!user) return;

    user.send(messageToSend).then(() => {
      message.channel.send('Jess recebeu sua mensagem. 😃')
    })
  }
}