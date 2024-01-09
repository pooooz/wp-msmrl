import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../common/contracts/interfaces/jwt.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secrets').refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const user = await this.authService.validateUser(
      typeof payload.sub === 'string' ? Number(payload.sub) : payload.sub,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    payload.role = user.role;

    return { ...payload, role: user.role };
  }
}
