import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressReq, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(
      req.user,
    );
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Post('register')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Post('access-token')
  async getNewToken(@Req() req: ExpressReq, @Res({ passthrough: true }) res: Response){
    const refreshTokenFromCookie = req.cookies[this.authService.NAME_REFRESH_TOKEN]
    if(!refreshTokenFromCookie){
      this.authService.removeRefreshTokenToResponse(res)
      throw new UnauthorizedException('Refresh token now passed')
    }
    const {refreshToken, ...response} = await this.authService.getNewTokens(
      refreshTokenFromCookie
    )
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenToResponse(res);
    return true;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
