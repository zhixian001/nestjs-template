import { NestFactory } from '@nestjs/core';
// Uncomment to use global validation pipe
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

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

  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}
bootstrap();
