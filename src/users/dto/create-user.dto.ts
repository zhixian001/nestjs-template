import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'last name' })
  @IsString()
  lastName: string;
}
