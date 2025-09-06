export function parseStringArray(value: string): string[] {
  try {
    const result = JSON.parse(value);
    return Array.isArray(result) && result.every((i) => typeof i === 'string')
      ? result
      : [];
  } catch {
    return [];
  }
}
