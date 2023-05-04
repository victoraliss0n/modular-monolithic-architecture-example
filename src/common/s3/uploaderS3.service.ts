import { Inject, Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { ConfigType } from '@nestjs/config'
import { LoggerService } from 'src/common/loggers/logger.service'
import { S3Provider } from './s3-provider.constant'
import s3Config from 'src/config/s3.config'

export interface S3Result {
    readonly expires: number
    readonly urlImage: string
}

@Injectable()
export class UploaderS3Service {

    constructor(
        @Inject(s3Config.KEY)
        private readonly configService: ConfigType<typeof s3Config>,
        private readonly loggerService: LoggerService,
        @Inject(S3Provider)
        private readonly s3Provider: S3
    ) {
        this.loggerService.contextName = UploaderS3Service.name
    }

    public async upload(base64Image: string, referenceKey: string) {
        this.loggerService.info(`Called method: ${this.upload.name}()`)

        const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64')

        const data: S3.PutObjectRequest = {
            Bucket: this.configService.bucket,
            Key: `image/${referenceKey}.png`,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/png',
            ContentLength: buffer.length
        }

        await this.s3Provider.putObject(data).promise()
    }
}