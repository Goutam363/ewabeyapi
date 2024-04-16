import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';
import { FirebaseStorageService } from './firebase-storage.service';
import { AuthGuard } from '@nestjs/passport';
import { Project } from 'src/project/project.entity';
import { Staff } from 'src/auth/staff/staff.entity';
import { Admin } from 'src/auth/admin/admin.entity';

@Controller('firebase-storage')
export class FirebaseStorageController {
    constructor(private readonly firebaseStorageService: FirebaseStorageService) {}

    @Post('upload/project-details')
    @UseGuards(AuthGuard('admin-jwt'))
    @UseInterceptors(FileInterceptor('file'))
    uploadProjectDetails(@UploadedFile() file: File): Promise<Project> {
      // Handle the uploaded file here
      // For example, upload the file to Firebase Storage
      return this.firebaseStorageService.uploadProjectDetailsIntoFirebaseStorage(file);
    }

    @Post('upload/staff-details')
    @UseGuards(AuthGuard('admin-jwt'))
    @UseInterceptors(FileInterceptor('file'))
    uploadStaffDetails(@UploadedFile() file: File): Promise<Staff> {
      // Handle the uploaded file here
      // For example, upload the file to Firebase Storage
      return this.firebaseStorageService.uploadStaffDetailsIntoFirebaseStorage(file);
    }

    @Post('upload/admin-details')
    @UseGuards(AuthGuard('admin-jwt'))
    @UseInterceptors(FileInterceptor('file'))
    uploadAdminDetails(@UploadedFile() file: File): Promise<Admin> {
      // Handle the uploaded file here
      // For example, upload the file to Firebase Storage
      return this.firebaseStorageService.uploadAdminDetailsIntoFirebaseStorage(file);
    }
}
