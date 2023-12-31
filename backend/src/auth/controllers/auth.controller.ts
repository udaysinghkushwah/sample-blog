import {
  Controller,
  Get,
  Inject,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, IAuthService } from '../services/auth.service';
import { IUserService, UserService } from '../../user/services/user.service';
import getServerConfig from '../../config/configurations/server.config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: IAuthService,
    @Inject(UserService) private readonly userService: IUserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    console.log('Redirecting user to Google');
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(): Promise<void> {
    console.log('Redirecting user to Google');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect(getServerConfig().uiCallbackUrl)
  async googleAuthRedirect(@Req() req): Promise<{ url: string }> {
    const insertedUser = await this.userService.upsert(req.user);
    const accessToken = this.authService.handleLogin(insertedUser);
    return { url: `${getServerConfig().uiCallbackUrl}?token=${accessToken}` };
  }
  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  @Redirect(getServerConfig().uiCallbackUrl)
  async facebookAuthRedirect(@Req() req): Promise<{ url: string }> {
    const insertedUser = await this.userService.upsert(req.user);
    const accessToken = this.authService.handleLogin(insertedUser);
    return { url: `${getServerConfig().uiCallbackUrl}?token=${accessToken}` };
   
  }
}
