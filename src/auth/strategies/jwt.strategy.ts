import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'src/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.userId);

    if ( !user ) {
      throw new UnauthorizedException('Invalid access token');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    }
  }
}
