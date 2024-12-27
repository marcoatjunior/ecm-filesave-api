import { ForbiddenException, Logger } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { excecoes } from 'src/common/resources';
import { extraiBearerToken } from '../util/bearer-token.util';

export const passportProvider = () => {
  try {
    return {
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
      jwtFromRequest: extraiBearerToken,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_DOMAIN,
      algorithms: ['RS256'],
    };
  } catch (error) {
    Logger.error(error);
    throw new ForbiddenException(excecoes.erroInterno);
  }
};
