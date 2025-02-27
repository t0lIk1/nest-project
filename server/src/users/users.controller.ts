import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-aut.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: "Create user "})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() createDto: CreateUserDto) {
        return this.usersService.createUser(createDto);
    }

    @ApiOperation({summary: "get all users"})
    @ApiResponse({status: 200, type: [User]})
    // @ts-ignore
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
