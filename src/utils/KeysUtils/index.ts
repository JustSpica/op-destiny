import { IKeys } from '../../db/models/UsersModel';

export const getKeys = () => {
  const randomNumber = Number((Math.random() * 100).toFixed(4))

  if(randomNumber > 0 && randomNumber <= 0.5) {
    const body: IKeys = {
      id: 1,
      name: 'Shade Soul Key'
    };

    return body
  }

  if(randomNumber > 0.5 && randomNumber < 5) {
    const body: IKeys = {
      id: 2,
      name: 'Vengeful Spirit Key'
    };

    return body
  }
}

export const keysCardDrop = (tierChoice: number) => {
  const random = Number((Math.random() * 100).toFixed(4))

  console.log(`Key drop chance: ${random} %`)

  if(tierChoice === 5) {
    if(random > 0 && random <= 40) return 5;
    if(random <= 65) return 4;
    if(random <= 80) return 3;
    if(random <= 90) return 2;

    return 1;
  }

  if(tierChoice === 6) {
    if(random > 0 && random <= 50) return 6;
    if(random <= 85) return 5;

    return 4;
  }

  return -1;
}