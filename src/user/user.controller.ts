import { Controller, Post, Body, Get, Param, ConflictException } from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.userService.listUsers();
  }

  @Get(':id')
  async getUserById( @Param('id') id: number ) {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser( @Body() user: CreateUserDto ) {
    try {
      const newUser = await this.userService.createUser(user);

      return {
        message: 'User created successfully',
        userId: newUser.id,
      };
    } catch( error ) {
      throw new ConflictException( 'Email already exists' );
    }
  }
}
