import { createLogger, format, Logger, transports } from 'winston'
import { Injectable, Scope } from '@nestjs/common'

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {

    private _idempotencyKey: string
    private _contextName = 'Default'
    private readonly logger: Logger = createLogger()

    constructor() {
        this.logger.configure({
            transports: [this.logTransportConsole()],
            exitOnError: false,
        })
    }

    set idempotencyKey(idempotencyKey: string) {
        this._idempotencyKey = idempotencyKey
    }

    get idempotencyKey(): string {
        return this._idempotencyKey
    }

    set contextName(contextName: string) {
        this._contextName = contextName
    }

    get contextName(): string {
        return this._contextName
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    error(message: string, stackTrace?: any): void {
        this.logger.log({
            level: LogLevel.ERROR, message: message,
            meta: { context: this.contextName, stackTrace, idempotency: this._idempotencyKey }
        })
    }

    warn(message: string): void {
        this.logger.log({
            level: LogLevel.WARN, message: message,
            meta: { context: this.contextName, idempotency: this._idempotencyKey }
        })
    }

    info(message: string): void {
        this.logger.log({
            level: LogLevel.INFO, message: message,
            meta: { context: this.contextName, idempotency: this._idempotencyKey }
        })
    }

    private logTransportConsole() {
        return new transports.Console({
            handleExceptions: true,
            format: format.combine(
                format.timestamp(),
                format.printf(info => {
                    return `${info?.timestamp} [${info.level.toLocaleUpperCase()}] [${info?.meta?.context ?? ''}] ` +
                        `${info?.message} ${JSON.stringify(info?.meta)}`
                })
            ),
        })
    }
}