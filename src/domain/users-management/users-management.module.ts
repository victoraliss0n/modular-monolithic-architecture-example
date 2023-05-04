import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/common/loggers/logger.module';
import { User } from '../users/models/users.model';
import { UserSchema } from './user.schema';
import { UsersManagementProcessor } from './users-management.processor';

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forRoot('mongodb://127.0.0.1/27017'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersManagementProcessor],
})
export class UsersManagementModule { }
