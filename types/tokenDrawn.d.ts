export interface PercentageByGroup<T extends number | string> {
  timeframe: string
  monkey: T
  bitcoin: T
}

export type TokenDrawnPerformance<T extends number | string> = Pick<
  TokenDrawn,
  "name" | "symbol" | "timeframe"
> & {
  percentage_difference: T
}
