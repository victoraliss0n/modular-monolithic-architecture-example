import { User } from '../entities/users.entity';

export interface UsersRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}

export const USERS_REPOSITORY_TOKEN = 'users-repository-token';