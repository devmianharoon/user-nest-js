import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserDto } from '../data/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  async getUser(){
    return this.userService.getUser()
  }
  @Get(':id')
  async getUserId(@Param('id')id:number){
    return this.userService.getUserId(id)
  }
  @Patch(':id')
  async updateUser(@Param('id')id:number,@Body()UserDto:UserDto){
    await this.userService.updateUser(id, UserDto)
    return "User Updated Sucessfully" 

  }
  @Delete(':id')
  async delUser(@Param('id')id:number){
    await this.userService.delUser(id)
    return "User deleted Sucessfully"
  }
  // login
  @Post("login")
  async login(@Body() loginDto: { email: string; password: string }){
    const { email, password } = loginDto;
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { message: 'Login successful', user };
  }
}
  

