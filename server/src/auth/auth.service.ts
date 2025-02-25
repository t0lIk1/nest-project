import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        console.log("USER__________________", user);
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('A user with that name already exists', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        console.log("DTo", userDto);
        const user = await this.userService.createUser({...userDto, password: hashedPassword});
        console.log(user, "____________________________")
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        console.log("__________________________________________________________________________________")
        console.log(user)
        const payload = {email: user.dataValues.email, id: user.dataValues.id, roles: user.dataValues.roles};
        return {
            token: this.jwtService.sign(payload),
        }
    }


    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        // @ts-ignore
        const passwordEnqals = await bcrypt.compare(userDto.password, user.dataValues.password);
        if (user && passwordEnqals) {
            return user;
        }
        throw new UnauthorizedException({messege: "Invalid password or email"});
    }
}
