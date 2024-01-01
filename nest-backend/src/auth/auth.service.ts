import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthInputDto } from './dto/auth.dto';
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from './constants';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/contracts/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(userId: number) {
    const user = await this.usersService.findById(userId);

    if (user) {
      return {
        id: user.id,
        login: user.login,
        role: user.role,
      };
    }

    return null;
  }

  async generateAccessToken(userId: number, role: UserRole) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        role,
      },
      {
        secret: this.configService.get('secrets').accessTokenSecret,
        expiresIn: ACCESS_TOKEN_LIFETIME,
      },
    );
  }

  async generateRefreshToken(userId: number) {
    return this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.get('secrets').refreshTokenSecret,
        expiresIn: REFRESH_TOKEN_LIFETIME,
      },
    );
  }

  async generateTokens(userId: number, role: UserRole) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(userId, role),
      this.generateRefreshToken(userId),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(data: AuthInputDto) {
    const user = await this.usersService.findByLogin(data.login, undefined, {
      id: true,
      role: true,
      password: true,
    });

    if (!user) {
      throw new BadRequestException('Incorrect login or password');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Incorrect login or password');
    }

    return this.generateTokens(user.id, user.role);
  }
}
