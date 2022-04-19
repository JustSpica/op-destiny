export const randomNumbers = (min: number, max: number, notRounded?: boolean) => {
  if(notRounded) {
    return Number(Math.random() * (max - min + 1) + min).toFixed(4);
  }
  
  return Math.floor(Math.random() * (max - min + 1) + min);
}