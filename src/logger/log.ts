export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export function log(level: LogLevel, message: string, error?: Error | unknown): void {
  const prefix = `${level} insomnia-plugin-save-variables:`
  if (level === LogLevel.ERROR) {
    console.error(`${prefix} ${message}`, error)
  } else if (level === LogLevel.WARN) {
    console.warn(`${prefix} ${message}`, error)
  } else {
    console.log(`${prefix} ${message}`, error)
  }
}
