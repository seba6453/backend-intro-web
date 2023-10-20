import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { getUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @HttpCode(HttpStatus.ACCEPTED)
    @Put('update')
    update(@Body() data: UpdateUserDto, @Req() request: Request) {
        const token = request.headers['authorization'].split(" ")[1];
        return this.userService.updateUser(token,data);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.userService.findOne(email);
    }
}
