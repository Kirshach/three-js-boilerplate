export const throwDevTimeError = (message: string) => {
  if (import.meta.env.DEV) throw new Error(message);
  console.error(message);
};
