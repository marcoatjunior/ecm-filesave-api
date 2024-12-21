import { passportJwtSecret } from 'jwks-rsa';
import { extraiBearerToken } from '../util/bearer-token.util';

export const passportProvider = () => ({
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
});
