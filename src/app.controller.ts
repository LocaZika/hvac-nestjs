import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicRoute } from './decorators/route.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { expireDate, currentDate } from './utils/date.utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sendEMail')
  @PublicRoute()
  sendEmail() {
    this.mailerService.sendMail({
      to: 'locazikadev@gmail.com',
      subject: 'Activate account at Hvac',
      template: 'signup/activationAccount.template.hbs',
      context: {
        name: 'test email',
        activationCode: 'Activation Code Here',
        mailExpire: expireDate.toString(),
        sendAt: currentDate(),
      },
    });
    return 'sent mail';
  }
}
