import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/common/loggers/logger.module';
import { User, UserSchema } from './domain/user.schema';
import { UsersManagementProcessor } from './queues/users-management.processor';

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forRoot('mongodb://127.0.0.1/27017'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersManagementProcessor],
})
export class UsersManagementModule { }
