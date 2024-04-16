import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MobileModule } from './mobile/mobile.module';
import { ContactModule } from './contact/contact.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseStorageModule } from './firebase-storage/firebase-storage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    ThrottlerModule.forRoot([{
      ttl: 90000, //in miliseconds
      limit: 3,
    }]),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const isProduction = configService.get('STAGE') === 'prod';
          return {
            ssl: isProduction,
            extra: {
              ssl: isProduction ? { rejectUnauthorized: false } : null,
            },
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
            };
          },
        }),
    ProjectModule,
    AuthModule,
    MailModule,
    MobileModule,
    ContactModule,
    FirebaseStorageModule,
  ],
})
export class AppModule {}
