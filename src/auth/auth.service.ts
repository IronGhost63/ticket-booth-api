import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login( user: User ) {

  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
