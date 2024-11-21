import { PublicRoute } from '@/decorators/route.decorator';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { TMailerOptions } from './types/mailer.type';
import { ResponseData } from '@/global/responseData';
import { SentMessageInfo } from 'nodemailer';

@Controller('sendmail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/activationCode')
  sendActivationCode(
    @Body() mailerOptions: TMailerOptions,
  ): Promise<SentMessageInfo> {
    try {
      return this.mailerService.sendActivationCode(mailerOptions);
    } catch {
      throw new InternalServerErrorException('Failed to send activation code');
    }
  }

  @Post('/reactivateCode')
  resendActivationCode(
    @Body() mailerOptions: TMailerOptions,
  ): Promise<SentMessageInfo> {
    try {
      return this.mailerService.resendActivationCode(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to resend activation code',
      );
    }
  }

  @PublicRoute()
  @Post('/requestCallback')
  sendRequestCallback(
    @Body() mailerOptions: TMailerOptions,
  ): Promise<ResponseData<null>> {
    try {
      return this.mailerService.sendRequestCallback(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to send request a callback to mailer',
      );
    }
  }

  @PublicRoute()
  @Post('/contact')
  sendContact(
    @Body() mailerOptions: TMailerOptions,
  ): Promise<ResponseData<null>> {
    try {
      return this.mailerService.sendContact(mailerOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to send request a contact to mailer',
      );
    }
  }
}
