import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from '../../../../common/constants/datasource-typeorm';
import { User } from '../models/users.model';
import { USERS_REPOSITORY_TOKEN } from './user.repository.interface';
import { UsersInMemoryRepository } from './implementations/users.in-memory.repository';
import { UsersTypeOrmRepository } from './implementations/users.typeorm.repository';

export function provideUsersRepository(): Provider[] {
    return [
        {
            provide: USERS_REPOSITORY_TOKEN,
            useFactory: async (dependenciesProvider: UsersRepoDependenciesProvider
            ) => provideUsersRepositoryFactory(dependenciesProvider),
            inject: [UsersRepoDependenciesProvider],
        },
        UsersRepoDependenciesProvider,
    ];
}

async function provideUsersRepositoryFactory(
    dependenciesProvider: UsersRepoDependenciesProvider,
) {
    await ConfigModule.envVariablesLoaded;
    switch (process.env.DATABASE_DATASOURCE) {
        case DataSource.TYPEORM:
            return new UsersTypeOrmRepository(
                dependenciesProvider.typeOrmRepository,
            );
        case DataSource.MEMORY:
        default:
            return new UsersInMemoryRepository();
    }
}

@Injectable()
export class UsersRepoDependenciesProvider {
    constructor(
        @InjectRepository(User)
        public typeOrmRepository: Repository<User>,
    ) { }
}