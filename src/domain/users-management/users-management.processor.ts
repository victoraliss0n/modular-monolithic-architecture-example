
import { Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { UserCreatedEvent } from 'src/common/events/user-created.event';
import { LoggerService } from 'src/common/loggers/logger.service';
import { User } from './user.schema';

@Processor('users')
export class UsersManagementProcessor {

    constructor(
        private readonly loggerService: LoggerService,
        @InjectModel(User.name)
        private readonly userModel: Model<User>

    ) {
        this.loggerService.contextName = UsersManagementProcessor.name
    }

    @Process('user.created')
    async verify({ data }: Job<UserCreatedEvent>) {
        this.loggerService.info(`Called method: ${this.verify.name}()`)
        const createdUser = await this.userModel.create(data)
        this.loggerService.info(`USER CREATED: ${JSON.stringify(createdUser)}`)
    }

    @Process('user.email.send')
    async sendEmail({ data }: Job<UserCreatedEvent>) {
        this.loggerService.info(`Called method: ${this.sendEmail.name}()`)
        const createdUser = await this.userModel.create(data)
        this.loggerService.info(`USER SEND EMAIL: ${JSON.stringify(createdUser)}`)
    }
}
