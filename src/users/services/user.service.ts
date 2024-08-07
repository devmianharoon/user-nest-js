import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../data/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "../data/user.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    // create User
    async createUser(createUserDto : UserDto){
        let user : User = new User();
        user.id = createUserDto.id
        user.name = createUserDto.name
        user.email = createUserDto.email
        const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
          throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user.password = createUserDto.password
        return this.usersRepository.save(user)
        
    }

    // get user
    async getUser(){
        return this.usersRepository.find()
    }
}


