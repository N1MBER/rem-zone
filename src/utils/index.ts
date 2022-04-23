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
