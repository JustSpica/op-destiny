import { randomNumbers } from "../../../functions/randomNumbers"

export const triggerGreeting = (name: string) => {
  const arrStrings = [
    `Salve salve ${name} 😎`,
    `Opa ${name}, tudo certo ? 😊`,
    `Opa ${name}, tu tava sumido tchê. Vai um chimarrão ? 🧉`,
    `Eae mano, tudo tranquilo ai ? 🙂`,
    `Ai caramba, cuanto tiempo ${name}. Quieres una copa de tequila ? 🥃`, 
  ]

  const index = randomNumbers(0, 4)

  return arrStrings[index];
}