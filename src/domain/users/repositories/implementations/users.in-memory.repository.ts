
import { User } from '../../entities/users.entity';
import { UsersRepository } from '../user.repository.interface';

export class UsersInMemoryRepository implements UsersRepository {
    private users: User[] = [];

    async create(user: User) {
        this.users.push(user);
        return user;
    }

    async findAll() {
        return this.users;
    }
}