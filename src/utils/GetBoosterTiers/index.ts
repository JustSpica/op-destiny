export const getBoosterTiers = (value: number) => {
  const arr: number[] = [];
  
  for (let index = 0; index < value; index++) {
    const randomNumber = Number((Math.random() * 100).toFixed(4))

    console.log(`Valor: ${randomNumber} %`)

    if(randomNumber > 0 && randomNumber <= 5) {
      arr.push(6);
    } else {
      arr.push(5);
    }
  }

  return arr;
}