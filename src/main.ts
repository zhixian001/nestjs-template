import { NestFactory } from '@nestjs/core';
// Uncomment to use global validation pipe
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';

const CORS_ALLOWLIST = [
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:8080',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Api Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // Uncomment to use global validation pipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // );

  // Dynamic custom origin
  const customOrigin: CustomOrigin = (
    requestOrigin: string,
    callback: (err: Error | null, origin?: string) => void,
  ) => {
    try {
      const requestOriginURL = new URL(requestOrigin);

      if (requestOriginURL.hostname.endsWith('jhyeom.com')) {
        callback(null, requestOrigin);
      } else if (
        requestOriginURL.hostname === 'localhost' ||
        requestOriginURL.hostname === '127.0.0.1'
      ) {
        // 모든 localhost 도메인에서 CORS 요청 허용하기
        callback(null, requestOrigin);
      } else if (CORS_ALLOWLIST.includes(requestOrigin)) {
        callback(null, requestOrigin);
      } else {
        callback(null, 'https://*.jhyeom.com');
      }
    } catch (err) {
      callback(null, 'https://*.jhyeom.com');
    }
  };

  app.enableCors({
    credentials: true,
    origin: customOrigin,
  });

  // API Docs
  const config = new DocumentBuilder()
    .setTitle('<NESTJS-TEMPLATE:Title>')
    .setDescription('<NESTJS-TEMPLATE:Description>')
    .setVersion('<NESTJS-TEMPLATE:Version>')
    .addTag('users', `사용자 정보 관련 API`)
    // .addTag('new-tag', `new tag desc)
    // .addCookieAuth('mojitok-auth')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  });
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}
bootstrap();
