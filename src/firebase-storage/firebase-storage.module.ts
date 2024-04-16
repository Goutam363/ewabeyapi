import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';
import { FirebaseStorageService } from './firebase-storage.service';
import { FirebaseStorageController } from './firebase-storage.controller';
import { ProjectModule } from 'src/project/project.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    ProjectModule,
    AuthModule,
  ],
  providers: [FirebaseStorageService, MulterConfigService],
  controllers: [FirebaseStorageController],
})
export class FirebaseStorageModule {}
