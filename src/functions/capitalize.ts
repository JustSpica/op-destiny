export const capitalizeStr = (value: string) => {
  const arr = value.split(" ")
  const newValue = arr.map(item => item.charAt(0).toUpperCase() + item.slice(1))

  return newValue.join(' ');
}