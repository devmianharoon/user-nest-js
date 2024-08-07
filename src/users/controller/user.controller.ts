import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto } from '../data/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }
}
