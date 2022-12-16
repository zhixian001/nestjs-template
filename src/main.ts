import { NestFactory } from '@nestjs/core';
// Uncomment to use global validation pipe
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
