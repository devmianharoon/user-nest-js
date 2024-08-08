import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../data/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../data/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // create User
  async createUser(createUserDto: UserDto): Promise<User> {
    let user: User = new User();
    user.id = createUserDto.id;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  // get user
  async getUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // get user by id
  async getUserId(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  // update user
  async updateUser(id: number, createUserDto: UserDto) {
    return this.usersRepository.update(id, createUserDto);
  }

  // delete
  async delUser(id: number) {
    return this.usersRepository.delete(id);
  }
  // validate User
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (user && await bcrypt.compare(password,user.password)){
        return user
    }
    return null
  }
}
