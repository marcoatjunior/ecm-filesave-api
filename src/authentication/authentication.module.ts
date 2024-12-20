import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/config';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtConfig],
  exports: [PassportModule],
})
export class AuthenticationModule {}
