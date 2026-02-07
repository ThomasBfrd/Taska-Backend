import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('CLIENT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = request.cookies as Record<string, string> | undefined;
          return cookies?.jwt ?? null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  public validate(payload: { id: string; email: string }) {
    if (!payload) throw new UnauthorizedException('Access not auhtorized');

    return {
      userId: payload.id,
      email: payload.email,
    };
  }
}
