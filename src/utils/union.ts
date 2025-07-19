export default <T>(a: Array<T>, b: Array<T>) => {
  return [...new Set([...a, ...b])]
}