
import { registerAs } from '@nestjs/config'

export default registerAs('s3', () => ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: process.env.QRCODE_BUCKET,
    qrCodeExpires: +process.env.QRCODE_EXPIRES,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}))