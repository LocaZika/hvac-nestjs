type TToStringOptions = {
  joinCharacter?: string;
};
export function toString(
  data: Array<string> | object,
  options?: TToStringOptions,
): string {
  if (Array.isArray(data)) {
    return data.join(options?.joinCharacter ?? ',');
  }
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join(options?.joinCharacter ?? ',');
}
