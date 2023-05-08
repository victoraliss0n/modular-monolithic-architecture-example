import { Module } from "@nestjs/common"
import { CreditController } from "./credit-engine.controller"
import { CreditService } from "./credit-engine.service"

@Module({
    controllers: [CreditController],
    providers: [CreditService]
})
export class CreditModule { }
