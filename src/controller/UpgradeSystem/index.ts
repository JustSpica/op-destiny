import { Message } from "discord.js";

import { UserModel, IUserModel } from "../../db/models/UsersModel";

import { upgradeTiers } from "../../utils/UpgradeTiers";

export const UpgradeSystem = async (message: Message, amount: number) => {
  const user: IUserModel | null = await UserModel.findOne({
    idUser: message.author.id,
  })

  if(!user) {
    return message.channel.send(
      `Ops! ${message.author} não consegui achar você na minha lista. ` + 
      `Tente interagir um pouco mais com o pessoal. 🙂`
    )
  }

  if(!amount || amount === 0 || amount > 2000) {
    return message.channel.send(
      `Ops! ${message.author}, você só pode informar um valor entre 0 e 2000 DTC.`
    ).then(msg => msg.delete({ timeout: 6000 }));
  }

  if(user.coins < amount) {
    return message.channel.send(
      `${message.author}, você não possui Destiny coins (DTC) suficientes para usar esse recurso\n` + 
      `O valor atual na sua carteira é de: **${user.coins} DTC**`
    ).then(msg => msg.delete({ timeout: 6000 }));
  } else {
    /* await UserModel.findOneAndUpdate({
      idUser: message.author.id,
    }, {
      $set: {
        coins: user.coins - amount
      }
    }) */
  }

  upgradeTiers(amount);
}