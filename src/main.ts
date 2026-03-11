import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  const allowedOrigins: Array<string | undefined> = [
    configService.get<string>('LOCAL_CLIENT'),
    configService.get<string>('CLIENT_PATH'),
    configService.get<string>('BACK_PATH'),
  ];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Apollo-Require-Preflight',
      'Cookie',
    ],
    exposedHeaders: ['Set-Cookie'],
  });

  const port: number | undefined = configService.get<number>('PORT');
  await app.listen(port ?? 3000);
}

bootstrap();
