import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  response400Docs,
  response401Docs,
  response403Docs,
  responseTypeClassWrapper,
} from 'src/common/shared-api-docs-component';
import { User } from './entities';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Create User',
    summary: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'User created',
    // TODO: 임의로 User entity 객채를 놓은 것으로. 실제 사용시에는 다른 객체를 넣는다.
    type: responseTypeClassWrapper(User, 'CreateUserResponse'),
  })
  @ApiBadRequestResponse(response400Docs)
  @ApiUnauthorizedResponse(response401Docs)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // Uncomment if auth needed
  // @ApiCookieAuth()
  // @ApiBearerAuth()
  @ApiOperation({
    summary: `List Users`,
    description: `List all users`,
  })
  @ApiOkResponse({
    description: 'Subscription 목록 조회 성공',
    // type: responseTypeClassWrapper(User, 'ListUsersResponse'),
  })
  @ApiBadRequestResponse(response400Docs)
  @ApiUnauthorizedResponse(response401Docs)
  @ApiForbiddenResponse(response403Docs)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
