import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as RootMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    RootMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('>>Email module initializing...');
        return {
          transport: {
            host: configService.get('MAIL_HOST'),
            port: configService.get('MAIL_PORT'),
            ignoreTLS: true,
            secure: true,
            auth: {
              user: configService.get('MAIL_USER'),
              pass: configService.get('MAIL_PASS'),
            },
          },
          defaults: {
            from: 'Hvac <mailer@nestjs.com>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MailerModule {}
