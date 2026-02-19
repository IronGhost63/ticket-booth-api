// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
// import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
// import { RefreshTokenStrategy } from "./strategies/jwt-refresh.strategy";
// import { jwtConstants } from '../constant';
// import { RefreshToken } from './refresh-token.entity';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([RefreshToken]),
//     UserModule,
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: jwtConstants.secretExpires },
//     })
//   ],
//   providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
//   exports: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { User } from "src/user/user.entity";
import { RefreshToken } from './refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    UserModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
