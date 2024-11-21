import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService as RootMailerService } from '@nestjs-modules/mailer';
import { currentDate, expireDate } from '@/utils/date.utils';
import { TMailerOptions } from './types/mailer.type';
import { ConfigService } from '@nestjs/config';
import { SentMessageInfo } from 'nodemailer';
import { ResponseData } from '@/global/responseData';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: RootMailerService,
    private readonly configService: ConfigService,
  ) {}

  sendActivationCode(mailerOptions: TMailerOptions): Promise<SentMessageInfo> {
    if (!mailerOptions.email)
      throw new BadRequestException('Email is required');
    return this.mailerService.sendMail({
      to: mailerOptions.email,
      subject: 'Activate account at Hvac',
      template: 'signup/activationAccount.template.hbs',
      context: {
        name: mailerOptions.name,
        activationCode: mailerOptions.activationCode,
        mailExpire: expireDate.toString(),
        sendAt: currentDate(),
      },
    });
  }

  resendActivationCode(
    mailerOptions: TMailerOptions,
  ): Promise<SentMessageInfo> {
    if (!mailerOptions.email)
      throw new BadRequestException('Email is required');
    return this.mailerService.sendMail({
      to: mailerOptions.email,
      subject: 'Resend activation code',
      template: 'resendCode/resendCode.template.hbs',
      context: {
        name: mailerOptions.name,
        activationCode: mailerOptions.activationCode,
        mailExpire: expireDate.toString(),
        sendAt: currentDate(),
      },
    });
  }

  async sendRequestCallback(
    mailerOptions: TMailerOptions,
  ): Promise<ResponseData<null>> {
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_USER'),
      subject: 'Request a callback',
      template: 'requestCallback/requestCallback.template.hbs',
      context: {
        name: mailerOptions.name,
        phone: mailerOptions.phone,
        email: mailerOptions.email,
        service: mailerOptions.service,
        sendAt: currentDate(),
      },
    });
    return {
      statusCode: 200,
      ok: true,
      data: null,
    };
  }

  async sendContact(
    mailerOptions: TMailerOptions,
  ): Promise<ResponseData<null>> {
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_USER'),
      subject: `Request a contact`,
      template: 'requestContact/requestContact.template.hbs',
      context: {
        name: mailerOptions.name,
        email: mailerOptions.email,
        subject: mailerOptions.subject,
        question: mailerOptions.question,
        sendAt: currentDate(),
      },
    });
    return {
      statusCode: 200,
      ok: true,
      data: null,
    };
  }
}
