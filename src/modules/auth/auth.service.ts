import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../types/types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  NAME_REFRESH_TOKEN = 'refreshToken';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      const passwordIsMatch = await argon2.verify(user?.password, password);
      if (user && passwordIsMatch) {
        return user;
      }
    }

    throw new UnauthorizedException('User or password are incorrect!');
  }

  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
    });

    return { accessToken, refreshToken };
  }

  async login(user: IUser) {
    const { id, email } = user;
    const payload = { email, id };

    const tokens = this.generateTokens(payload);

    return {
      id,
      email,
      ...tokens,
    };
  }

  async registration(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.NAME_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  async removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.NAME_REFRESH_TOKEN, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const { password, ...user } = await this.userService.getById(result.id);
    const { id, email } = user;
    const payload = { email, id };
    const tokens = this.generateTokens(payload);
    return {
      user,
      ...tokens,
    };
  }
}
