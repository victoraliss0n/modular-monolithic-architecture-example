import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateUserDto {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @Field(() => String)
    @IsEmail()
    @IsNotEmpty()
    readonly email: string
}

@ObjectType()
export class UserOutput {
    @Field(() => String)
    readonly name: string

    @Field(() => String)
    readonly email: string
}