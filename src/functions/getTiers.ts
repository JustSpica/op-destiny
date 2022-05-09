export const getDefaultTiers = (count: number) => {
  const tiersArr: number[] = [];

  for (let index = 0; index < count; index++) {
    const random = Number((Math.random() * 100).toFixed(4));

    if(random > 0 && random <= 0.05) {
      tiersArr.push(6);
    }
    if(random <= 1.2) {
      tiersArr.push(5);
    }
    if(random <= 5.2) {
      tiersArr.push(4);
    }
    if(random <= 25.2) {
      tiersArr.push(3);
    }
    if(random <= 53.2) {
      tiersArr.push(2);
    }
    if(random > 53.2) {
      tiersArr.push(1);
    }

    return tiersArr;
  }
}