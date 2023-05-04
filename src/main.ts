import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filters/exception.filter'
import { AppModule } from './ioC/app.module'


// Pipes, Guards, Interceptors, Filters
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000)
}

bootstrap();
