import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  privateEncrypt,
  publicDecrypt,
  randomBytes,
} from 'crypto';
import { EncryptPayloadDTO } from './dto/encryptPayload.dto';
import { DecryptPayloadDTO } from './dto/decryptPayload.dto';
import { privateKey, publicKey } from './keys';

@Injectable()
export class EncryptDecryptService {
  async getEncrypt(encryptPayloadDTO: EncryptPayloadDTO) {
    try {
      const payload = encryptPayloadDTO.payload;
      const iv = randomBytes(16);
      const aesKey = randomBytes(32).toString('hex');
      const key = Buffer.from(aesKey, 'hex');
      const cipher = createCipheriv('aes-256-ctr', key, iv);
      // data2
      const encryptPayload: Buffer = Buffer.concat([
        cipher.update(payload),
        cipher.final(),
      ]);
      const ivWithPayload =
        iv.toString('hex') + ':' + encryptPayload.toString('hex');
      // data1
      const encryptKey: Buffer = privateEncrypt(privateKey, key);

      return {
        successful: true,
        error_code: '',
        data1: encryptKey.toString('hex'),
        data2: ivWithPayload,
      };
    } catch (error) {
      return {
        success: false,
        error_code: error.code,
        data: null,
      };
    }
  }

  getDecrypt(decryptPayloadDTO: DecryptPayloadDTO) {
    try {
      const { data1, data2 } = decryptPayloadDTO;
      const aesKey = publicDecrypt(publicKey, Buffer.from(data1, 'hex'));
      const iv = Buffer.from(data2.split(':')[0], 'hex');
      const encryptPayload = Buffer.from(data2.split(':')[1], 'hex');
      const decipher = createDecipheriv('aes-256-ctr', aesKey, iv);
    //   return {
    //     success: true,
    //     error_code: '',
    //     paylaod: 'xxxx'
    //   }
      const decryptPayload = Buffer.concat([
        decipher.update(encryptPayload),
        decipher.final(),
      ]);

      return {
        success: true,
        error_code: '',
        paylaod: decryptPayload.toString(),
      };
    } catch (error) {
      return {
        success: false,
        error_code: error.code,
        payload: null,
      };
    }
  }
}