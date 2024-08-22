import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log('>>Environment: ', configService.get('NODE_ENV'));
        console.log('>>DB_HOST: ', configService.get('DB_HOST'));
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/entities/*.entity.ts'],
          autoLoadEntities: true,
          synchronize:
            configService.get<string>('DB_HOST') === 'localhost' ? true : false,
          ssl:
            configService.get<string>('DB_HOST') === 'localhost' ? false : true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
