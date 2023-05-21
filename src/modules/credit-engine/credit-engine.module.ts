import { Module } from "@nestjs/common"
import { CreditController } from "./http/credit-engine.controller"
import { CreditService } from "./domain/credit-engine.service"

@Module({
    controllers: [CreditController],
    providers: [CreditService]
})
export class CreditModule { }
