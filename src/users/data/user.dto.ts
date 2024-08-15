// for create user dto
export class UserDto{
    id : number
    name :string 
    email : string
    password : string
}
// for login Dto
export class LoginDto{
    email: string;
    password: string
}