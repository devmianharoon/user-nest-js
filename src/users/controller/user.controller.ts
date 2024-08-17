import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { LoginDto, UserDto } from '../data/user.dto';
import {AuthGuard} from '../user.guard'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  async getUser(){
    return this.userService.getUser()
  }
  @Get(':id')
  async getUserId(@Param('id',ParseIntPipe)id:number){
    console.log(id , typeof(id));  // pipe  used for restrict typing 
    
    return this.userService.getUserId(id)
  }
  @Patch(':id')
  async updateUser(@Param('id',ParseIntPipe)id:number,@Body()UserDto:UserDto){
    await this.userService.updateUser(id, UserDto)
    return "User Updated Sucessfully" 

  }
  @Delete(':id')  
  async delUser(@Param('id',ParseIntPipe)id:number){
    await this.userService.delUser(id)
    return "User deleted Sucessfully"
  }
  // login
  @Post("login")
  async login(@Body() loginDto: LoginDto,){
    const { email, password } = loginDto;
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'Login successfully', user };
  }
}
  

