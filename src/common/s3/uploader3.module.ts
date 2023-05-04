import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import s3Config from 'src/config/s3.config';
import { LoggerModule } from '../loggers/logger.module';
import { S3Provider } from './s3-provider.constant';
import { UploaderS3Service } from './uploaderS3.service';

@Module({
    imports: [LoggerModule, ConfigModule.forRoot({
        load: [s3Config]
    })],
    providers: [
        UploaderS3Service,
        {
            provide: S3Provider,
            useFactory: ({ accessKeyId, secretAccessKey }: ConfigType<typeof s3Config>): S3 => (
                new S3({
                    credentials: {
                        accessKeyId,
                        secretAccessKey,
                    }
                })),
            inject: [s3Config.KEY]
        }],
})
export class UploadS3Module { }
