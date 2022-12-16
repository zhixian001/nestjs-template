import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new testre';
  }

  findAll() {
    return `This action returns all testres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testre`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} testre`;
  }

  remove(id: number) {
    return `This action removes a #${id} testre`;
  }
}
