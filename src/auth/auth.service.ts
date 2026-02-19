import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { hash, compare } from 'bcrypt';
import { Repository } from "typeorm";
import { UserService } from '../user/user.service';
import { RefreshToken } from './refresh-token.entity';
import { jwtConstants } from "src/constant";
import { RefreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if ( !user) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      return user;
    } catch (error) {
      this.logger.error('Verify user error', error);

      throw new UnauthorizedException('Credentials are not valid');
    }
  }

  async login( email: string, password: string ) {
    try {
      const user = await this.userService.verifyUserPassword(email, password);

      if ( !user ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const refreshExpirationMs = parseInt( jwtConstants.refreshSecretExpires ) * 1000;
      const expiresRefreshToken = new Date(Date.now() + refreshExpirationMs);

      const tokenPayload = {
        userId: user.id,
        isAdmin: user.isAdmin,
      };

      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.secretExpires,
      });

      const refreshToken = this.jwtService.sign(tokenPayload, {
        secret:jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshSecretExpires,
      });

      const insertRefreshToken = new RefreshToken();

      insertRefreshToken.userId = user.id;
      insertRefreshToken.refreshToken = await hash(refreshToken, 10);
      insertRefreshToken.expire = expiresRefreshToken.toISOString();

      await this.refreshTokenRepository.save(insertRefreshToken);

      return {accessToken, refreshToken};
    } catch (error) {
      this.logger.error(`Login failed for user ${email}: ${error.message}`);
      this.logger.debug(`Stack trace: ${error.stack}`);

      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logout(userId: number, refreshToken: string, response: Response) {
    try {
      await this.refreshTokenRepository.delete({ userId,refreshToken });

      response.status(200).json({ message: 'Successfully signed out' });
    } catch (error) {
      this.logger.error('Sign out error:', {
        error: error.message,
        userId,
        stack: error.stack,
      });

      throw new UnauthorizedException('Failed to process sign out');
    }
  }

  async refreshToken( payload: RefreshDto ) {

  }

  async verifyUserRefreshToken( refreshToken: string, userId: number ) {
    try {
      const user = await this.refreshTokenRepository.findOneBy({refreshToken, userId});

      if ( !user ) {
        throw new UnauthorizedException('invalid refresh token');
      }

      const refreshTokenMatches = await compare(
        refreshToken,
        user.refreshToken,
      );

      if (!refreshTokenMatches) {
        throw new UnauthorizedException('invalid refresh token');
      }

      return user;
    } catch (error) {
      this.logger.error('Verify user refresh token error', error);

      throw new UnauthorizedException('invalid refresh token');
    }
  }
}
