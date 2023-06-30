import { MersenneTwister19937, sample } from "random-js"

const selectTokens = (list: any[], quantity: number) => {
  const engine = MersenneTwister19937.autoSeed()

  return sample(engine, list, quantity)
}

export default selectTokens
