export function convertError<TYPE extends Record<string, unknown | undefined>>(
  object: TYPE
): Partial<Record<keyof TYPE, string>> {
  const error: Partial<Record<keyof TYPE, string>> = {};
  if (typeof object !== 'object') {
    return error;
  }
  Object.keys(object).forEach((key) => {
    const item = object[key];
    const caption: string = Array.isArray(item) ? item.join(' ') : `${item}`;
    error[key as keyof TYPE] = caption;
  });

  return error;
}
