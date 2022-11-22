export const throwDevTimeError = (message: string) => {
  if (process.env.NODE_ENV === 'development') throw new Error(message);
  console.error(message);
};
