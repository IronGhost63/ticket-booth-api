import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./auth/guard/roles.guard";
import { Roles } from "./auth/roles.decorator";
import { Role } from "./auth/roles.enum";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private appService: AppService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('stat')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  getStat() {
    return this.appService.getStat();
  }
}
