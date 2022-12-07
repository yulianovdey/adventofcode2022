export function unique<T>(arr: T[]): T[] {
  return Object.keys(arr.reduce((a, b) => {
    if (!a[b]) {
      a[b] = true
    }

    return a;
  }, {}));
}
