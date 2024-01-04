import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../common/contracts/interfaces/jwt.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secrets').accessTokenSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(
      typeof payload.sub === 'string' ? Number(payload.sub) : payload.sub,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
