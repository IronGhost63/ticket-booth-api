import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { JwtRefreshAuthGuard } from "./guard/jwt-refresh-auth.guard";
import { RolesGuard } from "./guard/roles.guard";
import { Roles } from "./roles.decorator";
import { Role } from "./roles.enum";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login( @Body() credential: AuthDto ) {
    return this.authService.login(credential.email, credential.password);
  }

  @Post('logout')
  async logout() {
    // Implement logout logic here
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh( payload: RefreshDto) {
    return await this.authService.refreshToken(payload);
  }

  @Post('validate')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async validateAdminToken() {
    return {
      message: 'ok',
      role: 'admin'
    }
  }

  @Post('validate')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.USER)
  async validateUserToken() {
    return {
      message: 'ok',
      role: 'user'
    }
  }
}
