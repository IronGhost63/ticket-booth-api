import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from "./user.entity";

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
  async createUser( @Body() user: User ) {
    return this.userService.createUser(user);
  }
}
