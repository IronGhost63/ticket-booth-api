import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { hash } from 'bcrypt';

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

  async createUser( user: User ) {
    try {
      const insertUser = {
        ...user,
        password: hash(user.password, 10)
      }

      await this.userRepository.save(insertUser);
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
    return this.userRepository.findOneBy({ id: userId });
  }

  async getUserByEmail( email: string ) {
    return this.userRepository.findOneBy({ email });
  }
}
