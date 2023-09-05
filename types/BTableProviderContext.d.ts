
export interface BTableProviderContext {
  readonly filter?: string
  readonly currentPage?: number
  readonly perPage?: number
  readonly sortBy?: string
  readonly sortDesc?: boolean
}
