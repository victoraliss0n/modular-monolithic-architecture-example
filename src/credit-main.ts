import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filters/exception.filter'
import { CreditModule } from './modules/credit-engine/credit-engine.module'


async function bootstrap() {
    const app = await NestFactory.create(CreditModule)
    app.setGlobalPrefix('v1')
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new AllExceptionsFilter())
    await app.listen(3001)
}

bootstrap()
