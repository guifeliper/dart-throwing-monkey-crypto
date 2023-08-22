export class Kraken {
  private baseUrl: string

  constructor() {
    this.baseUrl = "https://api.kraken.com/"
  }

  private async _fetch<T>(
    endpoint: string,
    queryParams: Record<string, any> = {}
  ): Promise<T> {
    var options = {
      next: { revalidate: 60 * 60 * 24 * 6 },
    }
    const query = new URLSearchParams(queryParams)
    const url = new URL(`${endpoint}?${query}`, this.baseUrl)
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  }

  async ticker(pair: string) {
    const endpoint = "0/public/Ticker"
    const queryParams = { pair }
    const listings = await this._fetch(endpoint, queryParams)
    return listings
  }
  async assetPairs() {
    const endpoint = "0/public/AssetPairs"
    const assets = await this._fetch(endpoint, {})
    return assets
  }
}
