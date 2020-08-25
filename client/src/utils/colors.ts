const hsla = {
  primary: '227, 51%, 25%',
  secondary: '12, 80%, 53%',
};

export const getColor = (
  type: 'primary' | 'secondary',
  opacity: 5 | 10 | 20 | 40 | 100 = 100,
) => {
  const opacityValue = opacity / 100;
  const toHsla = `hsla(${hsla[type]}, ${opacityValue})`;
  return toHsla;
};
