import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto, UserOutput } from "./dtos/create-users.dto";
import { UsersService } from "../domain/users.service";

@Resolver('User')
export class UserResolver {

    constructor(private readonly usersService: UsersService) { }

    @Query(() => [UserOutput])
    findAll(): Promise<UserOutput[]> {
        console.info('Called: ', this.findAll.name)
        return this.usersService.findAll()
    }

    @Mutation(() => UserOutput)
    create(@Args('data') args: CreateUserDto): Promise<UserOutput> {
        console.info(args)
        return this.usersService.create(args)
    }

}