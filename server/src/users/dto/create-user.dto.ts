import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'user@gmai.com', description: 'unique email address'})
    readonly email: string;
    @ApiProperty({example: 'aksdjnqj1@wqe', description: 'password'})
    readonly password: string;
}