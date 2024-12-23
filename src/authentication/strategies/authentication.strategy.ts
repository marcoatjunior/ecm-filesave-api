import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy } from 'passport-jwt';
import { excecoes } from 'src/common/resources';
import { JwtPayload } from '../models/jwt-payload.interface';
import { passportProvider } from '../providers/passport.provider';

dotenv.config();

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(passportProvider());
  }

  validate(payload: JwtPayload): JwtPayload {
    const minimumScope = ['openid', 'profile', 'email'];

    if (
      payload?.scope
        ?.split(' ')
        .filter((scope) => minimumScope.indexOf(scope) > -1).length !== 3
    ) {
      throw new UnauthorizedException(excecoes.tokenInvalido);
    }

    return payload;
  }
}
