import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { User } from '../domain/entities/users.entity';
import { UsersService } from '../domain/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
