
import { Repository } from 'typeorm';
import { User } from '../../models/users.model';
import { UsersRepository } from '../user.repository.interface';

export class UsersTypeOrmRepository implements UsersRepository {
    constructor(private usersRepository: Repository<User>) { }

    async create(user: User) {
        await this.usersRepository.insert(user);
        return user;
    }

    async findAll() {
        return this.usersRepository.find();
    }
}