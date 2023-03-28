export const colors: { [key: string]: string } = {
  sky: '#dff9fb',
  pink: '#ffcccc',
  gold: '#ffeaa7',
  brown: '#dfe6e9',
  grey: '#dcdde1',
}

export const colorsList = Object.keys(colors).map((color: string) => {
  return colors[color];
});
