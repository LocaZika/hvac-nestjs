import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { TMailOptions } from './types/mail.d';
import { SentMessageInfo } from 'nodemailer';

@Controller('sendmail')
export class MailController {
  constructor(private readonly mailerService: MailService) {}

  @Post('/activationCode')
  sendActivationCode(
    @Body() mailerOptions: TMailOptions,
  ): Promise<SentMessageInfo> {
    try {
      return this.mailerService.sendActivationCode(mailerOptions);
    } catch {
      throw new InternalServerErrorException('Failed to send activation code');
    }
  }

  @Post('/reactivateCode')
  resendActivationCode(
    @Body() mailerOptions: TMailOptions,
  ): Promise<SentMessageInfo> {
    try {
      return this.mailerService.resendActivationCode(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to resend activation code',
      );
    }
  }

  @Post('/requestCallback')
  sendRequestCallback(@Body() mailerOptions: TMailOptions): Promise<null> {
    try {
      return this.mailerService.sendRequestCallback(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to send request a callback to mailer',
      );
    }
  }

  @Post('/contact')
  sendContact(@Body() mailerOptions: TMailOptions): Promise<null> {
    try {
      return this.mailerService.sendContact(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to send request a contact to mailer',
      );
    }
  }
}
