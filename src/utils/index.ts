import { Group } from '../types/user';

export const generateRandomValue = (maxLimit = 10) => {
  const rand = Math.random() * maxLimit;
  const value = Math.floor(rand);
  return value;
};

export const limits = [10, 20, 50, 100];

export function getQueryData<TYPE extends Record<string, unknown>>(
  search: string
): TYPE | undefined {
  if (search.trim() !== '') {
    const query = JSON.parse(
      `{"${decodeURI(search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`
    ) as TYPE;
    return query;
  }
}

export function convertDataToQuery<TYPE extends Record<string, unknown>>(
  data: TYPE
): string {
  const params: Record<string, string> = {};
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      const value = data[key];
      const str: string =
        typeof value === 'number' || typeof value === 'string'
          ? value.toString()
          : JSON.stringify(value);
      params[key] = str;
    }
  });
  return new URLSearchParams(params).toString();
}

export const convertGroupToString = (group?: Group): string => {
  if (group) {
    if (group.id === 1) {
      return 'Мастер приемщик';
    }
    if (group.id === 2) {
      return 'Исполнитель';
    }
  }
  return 'Администратор';
};

export const userTypes = {
  admin: 'Администратор',
  'master-reciever': 'Мастер приемщик',
  'master-executor': 'Исполнитель',
};

function isObject(object: unknown) {
  return object != null && typeof object === 'object';
}

export const deepEqual = (
  object1: Record<string, unknown>,
  object2: Record<string, unknown>
) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects &&
        !deepEqual(
          val1 as Record<string, unknown>,
          val2 as Record<string, unknown>
        )) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
