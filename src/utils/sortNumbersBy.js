export function sortNumbersBy(key, arr, order) {
  if (typeof arr[0][key] !== "number") return arr

  const copyOfArray = [...arr].sort((a, b) => Number(a[key]) - Number(b[key]))

  return order === "dsc" ? copyOfArray.reverse() : copyOfArray
}
