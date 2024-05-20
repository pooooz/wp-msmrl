import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '../common/decorators/public-route.decorator';
import { AuthInputDto } from './dto/auth.dto';
import { convertLifetimeStringToMilliseconds } from './utils/convertLifetimeStringToMilliseconds';
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from './constants';
import { RefreshAuthGuard } from '../common/guards/refresh.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @PublicRoute()
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
  })
  async signIn(
    @Body() authDto: AuthInputDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signIn(authDto);

    response.cookie('access_token', result.accessToken, {
      maxAge: convertLifetimeStringToMilliseconds(ACCESS_TOKEN_LIFETIME),
      secure: true,
    });
    response.cookie('refresh_token', result.refreshToken, {
      maxAge: convertLifetimeStringToMilliseconds(REFRESH_TOKEN_LIFETIME),
      secure: true,
    });

    response.json(result);
  }

  @Post('refresh')
  @PublicRoute()
  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({
    status: 200,
  })
  @UseGuards(RefreshAuthGuard)
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;

    if (user) {
      const result = await this.authService.generateTokens(
        typeof user.sub === 'string' ? Number(user.sub) : user.sub,
        user.role,
      );
      response.cookie('access_token', result.accessToken, {
        maxAge: convertLifetimeStringToMilliseconds(ACCESS_TOKEN_LIFETIME),
        secure: true,
      });
      response.cookie('refresh_token', result.refreshToken, {
        maxAge: convertLifetimeStringToMilliseconds(REFRESH_TOKEN_LIFETIME),
        secure: true,
      });
      response.json(result);
      return;
    }

    throw new UnauthorizedException();
  }
}
