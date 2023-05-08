/* eslint-disable @typescript-eslint/no-empty-function */
import { Get, Injectable } from '@nestjs/common'

@Injectable()
export class CreditService {
    constructor() { }

    @Get()
    findAll() {
        return 'Hello Credit'
    }
}
