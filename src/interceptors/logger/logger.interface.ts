export interface LoggerService {
    debug(message: string, ...meta: any[]): void
    error(message: string, ...meta: any[]): void
    info(message: string): void
    warn(message: string, ...meta: any[]): void
  }