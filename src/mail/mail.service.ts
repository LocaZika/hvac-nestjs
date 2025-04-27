import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService as RootMailerService } from '@nestjs-modules/mailer';
import { currentDate, expireDate } from '@utils/date.util';
import { TMailOptions } from './types/mail.d';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: RootMailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendActivationCode(mailOptions: TMailOptions): Promise<any> {
    if (!mailOptions.email) throw new BadRequestException('Email is required');
    return await this.mailerService.sendMail({
      to: mailOptions.email,
      subject: 'Activate account at Hvac',
      template: 'register/activationAccount.template.hbs',
      context: {
        name: mailOptions.name,
        activationCode: mailOptions.activationCode,
        mailExpire: expireDate.toString(),
        sendAt: currentDate(),
      },
    });
  }

  async resendActivationCode(mailOptions: TMailOptions): Promise<any> {
    if (!mailOptions.email) throw new BadRequestException('Email is required');
    return await this.mailerService.sendMail({
      to: mailOptions.email,
      subject: 'Resend activation code',
      template: 'resendCode/resendCode.template.hbs',
      context: {
        name: mailOptions.name,
        activationCode: mailOptions.activationCode,
        mailExpire: expireDate.toString(),
        sendAt: currentDate(),
      },
    });
  }

  async sendRequestCallback(mailOptions: TMailOptions): Promise<null> {
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_USER'),
      subject: 'Request a callback',
      template: 'requestCallback/requestCallback.template.hbs',
      context: {
        name: mailOptions.name,
        phone: mailOptions.phone,
        email: mailOptions.email,
        service: mailOptions.service,
        sendAt: currentDate(),
      },
    });
    return null;
  }

  async sendContact(mailOptions: TMailOptions): Promise<null> {
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_USER'),
      subject: `Request a contact`,
      template: 'requestContact/requestContact.template.hbs',
      context: {
        name: mailOptions.name,
        email: mailOptions.email,
        subject: mailOptions.subject,
        question: mailOptions.question,
        sendAt: currentDate(),
      },
    });
    return null;
  }
}
