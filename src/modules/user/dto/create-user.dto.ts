import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	email: string;

	@MinLength(4, { message: 'Password too short' })
	password: string;

}
