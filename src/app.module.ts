import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration, { DatabaseConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseLogger from './utils/databaseLogger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<DatabaseConfig>('database.postgres').host,
        port: configService.get<DatabaseConfig>('database.postgres').port,
        username: configService.get<DatabaseConfig>('database.postgres').user,
        password:
          configService.get<DatabaseConfig>('database.postgres').password,
        entities: [],
        synchronize: true,
        logging: true,
        logger: new DatabaseLogger(),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
