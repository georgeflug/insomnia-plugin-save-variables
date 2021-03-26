export type StoreContext = {
  hasItem(key: string): Promise<boolean>
  setItem(key: string, value: string): Promise<void>
  getItem(key: string): Promise<string | null>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
  all(): Promise<Array<{ key: string; value: string }>>
}
