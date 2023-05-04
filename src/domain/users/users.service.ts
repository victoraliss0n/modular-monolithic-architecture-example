import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { CreateUserDto } from './dtos/create-users.dto';
import { User } from './entities/users.entity';
import { UsersRepository, USERS_REPOSITORY_TOKEN } from './repositories/user.repository.interface';
import { UserCreatedEvent } from '../../common/events/user-created.event';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository,
    @InjectQueue('users') private usersQueue: Queue,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async create(userDto: CreateUserDto) {
    const { email, name } = userDto
    const user = await this.usersRepository.create(userDto)
    this.eventEmitter.emit('user.created', new UserCreatedEvent(name, email))
    await this.usersQueue.add('user.created', new UserCreatedEvent(name, email))
    await this.usersQueue.add('user.email.send', new UserCreatedEvent(name, email))
    return user
  }

  @OnEvent('user.created', { async: true })
  async welcomeNewUser() {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 6000))
    console.info('USER CREATED --> EVENT EMITTER')
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
