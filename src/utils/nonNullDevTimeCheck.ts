import {throwDevTimeError} from './throwDevTimeError';

export const nonNullDevTimeCheck = <T>(value: T, errorMessage?: string): NonNullable<T> => {
  if (value == null) {
    throwDevTimeError(errorMessage ?? `Non-null value expected, received ${value} instead`);
  }
  return value as NonNullable<T>;
};
