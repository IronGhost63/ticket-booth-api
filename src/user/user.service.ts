import { Injectable, Logger, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash, compare } from 'bcrypt';
import { Role } from "src/auth/roles.enum";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listUsers() {
    return await this.userRepository.find();
  }

  async createUser( user: CreateUserDto ) {
    try {
      const insertUser = new User();

      insertUser.name = user.name;
      insertUser.email = user.email;
      insertUser.password = await hash(user.password, 10);
      insertUser.roles = Role.USER;

      await this.userRepository.save(insertUser);

      return insertUser;
    } catch( error ) {
      this.logger.error(`Failed to create user: ${error.message}`);

      throw new InternalServerErrorException( 'An unexpected error occurred while creating user');
    }
  }

  async updateUser( user: User ) {
    try {
      await this.userRepository.update({ id: user.id }, user);
    } catch( error ) {
      this.logger.error(`Failed to update user: ${error.message}`);

      throw new InternalServerErrorException( 'An unexpected error occurred while updating user');
    }
  }

  async getUserById( userId: number ) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOneBy({ email });
  }

  async verifyUserPassword( email: string, password: string ) {
    const userFromEmail = await this.userRepository.findOneBy({ email });

    if ( !userFromEmail) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const authenticated = await compare(password, userFromEmail.password);

    if (!authenticated) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return userFromEmail;
  }
}
