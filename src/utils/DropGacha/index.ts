export const dropGacha = (value: number) => {
  let rank = [];

  for (let index = 0; index < value; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(2));

    if(randomNumber <= 0.5) {
      rank.push(5);
    } else if(randomNumber <= 7) {
      rank.push(4);
    } else if(randomNumber <= 25.75) {
      rank.push(3);
    } else if(randomNumber <= 60) {
      rank.push(2);
    } else {
      rank.push(1);
    }
  }

  return rank;
}