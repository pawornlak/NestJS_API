import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class EncryptPayloadDTO {
  @IsString()
  @MaxLength(2000)
  @ApiProperty()
  payload: string;
}