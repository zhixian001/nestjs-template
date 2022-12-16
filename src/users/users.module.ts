import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as usersEntities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([...Object.values(usersEntities)])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
