import { Controller, Post, Body } from '@nestjs/common';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { EncryptPayloadDTO } from './dto/encryptPayload.dto';
import { DecryptPayloadDTO } from './dto/decryptPayload.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Controller EncryptDecrypt')
@Controller()
export class EncryptDecryptController {
  constructor(private readonly encryptDecryptService: EncryptDecryptService) {}

  @Post('get-encrypt-data')
  @ApiBody({ type: EncryptPayloadDTO })
  getEncrypt(@Body() encryptPayloadDTO: EncryptPayloadDTO) {
    return this.encryptDecryptService.getEncrypt(encryptPayloadDTO);
  }

  @Post('get-decrypt-data')
  @ApiBody({ type: DecryptPayloadDTO })
  getDecrypt(@Body() decryptPayloadDTO: DecryptPayloadDTO) {
    return this.encryptDecryptService.getDecrypt(decryptPayloadDTO);
  }
}