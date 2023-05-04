import { registerAs } from '@nestjs/config'

const ConnectionDatabaseType = {
    postgres: 'postgres',
}

export default registerAs('database', () => ({
    type: ConnectionDatabaseType[process.env.TYPEORM_TYPE],
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: +process.env.TYPEORM_PORT,
}))