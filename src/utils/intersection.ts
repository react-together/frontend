export default <T>(a: Array<T>, b: Array<T>) => {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...setA].filter(item => setB.has(item));
}