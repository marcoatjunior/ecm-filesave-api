import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationStrategy } from './strategies/authentication.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthenticationStrategy],
  exports: [PassportModule, AuthenticationStrategy],
})
export class AuthenticationModule {}
