/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get } from '@nestjs/common'
import { CreditService } from './credit-engine.service'

@Controller('credit')
export class CreditController {
    constructor(private readonly creditService: CreditService) { }

    @Get()
    findAll() {
        return this.creditService.findAll()
    }
}
