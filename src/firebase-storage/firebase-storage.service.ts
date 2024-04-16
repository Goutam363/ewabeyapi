import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { File } from 'multer';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import * as fs from 'fs';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/project.entity';
import { Staff } from 'src/auth/staff/staff.entity';
import { AuthService } from 'src/auth/auth.service';
import { Admin } from 'src/auth/admin/admin.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseStorageService {
  private storage;
  constructor(
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    const firebaseConfig = {
      apiKey: this.configService.get('FB_API_KEY'),
      authDomain: this.configService.get('FB_AUTH_DOMAIN'),
      projectId: this.configService.get('FB_PROJECT_ID'),
      storageBucket: this.configService.get('FB_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get('FB_MESSAGING_SENDER_ID'),
      appId: this.configService.get('FB_APP_ID'),
      measurementId: this.configService.get('FB_MEASUREMENT_ID'),
    };

    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
  }

  async uploadProjectDetailsIntoFirebaseStorage(file: File): Promise<Project> {
    const metadata = {
      contentType: 'application/pdf',
    };
  
    const filename = file.originalname;
    const filePath = file.path;
    const fileData = fs.readFileSync(filePath);
  
    const storageRef = ref(this.storage, 'ProjectDetails/' + filename);
    const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);
  
    return new Promise(async (resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress if needed
        },
        (error) => {
          // Delete the file from the ./uploads folder
          fs.unlinkSync(filePath);
          // Handle upload error
          reject(new InternalServerErrorException('Something went wrong while uploading project details.'));
        },
        async () => {
          try {
            // Upload completed successfully, get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Delete the file from the ./uploads folder
            fs.unlinkSync(filePath);
  
            const project_id = filename.split('.').slice(0, -1).join('.');
            const project_details = downloadURL;
            const project = await this.projectService.updateProjectDetails(project_id, project_details);
  
            resolve(project);
          } catch (error) {
            reject(new InternalServerErrorException('Something went wrong while uploading project details.'));
          }
        }
      );
    });
  }

  async uploadStaffDetailsIntoFirebaseStorage(file: File): Promise<Staff> {
    const metadata = {
      contentType: 'application/pdf',
    };
  
    const filename = file.originalname;
    const filePath = file.path;
    const fileData = fs.readFileSync(filePath);
  
    const storageRef = ref(this.storage, 'StaffDetails/' + filename);
    const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);
  
    return new Promise(async (resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress if needed
        },
        (error) => {
          // Delete the file from the ./uploads folder
          fs.unlinkSync(filePath);
          // Handle upload error
          reject(new InternalServerErrorException('Something went wrong while uploading staff details.'));
        },
        async () => {
          try {
            // Upload completed successfully, get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Delete the file from the ./uploads folder
            fs.unlinkSync(filePath);
  
            const staff_id = filename.split('.').slice(0, -1).join('.');
            const staff_details = downloadURL;
            const staff = await this.authService.updateStaffDetails(staff_id, staff_details);
  
            resolve(staff);
          } catch (error) {
            reject(new InternalServerErrorException('Something went wrong while uploading staff details.'));
          }
        }
      );
    });
  }

  async uploadAdminDetailsIntoFirebaseStorage(file: File): Promise<Admin> {
    const metadata = {
      contentType: 'application/pdf',
    };
  
    const filename = file.originalname;
    const filePath = file.path;
    const fileData = fs.readFileSync(filePath);
  
    const storageRef = ref(this.storage, 'AdminDetails/' + filename);
    const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);
  
    return new Promise(async (resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress if needed
        },
        (error) => {
          // Delete the file from the ./uploads folder
          fs.unlinkSync(filePath);
          // Handle upload error
          reject(new InternalServerErrorException('Something went wrong while uploading admin details.'));
        },
        async () => {
          try {
            // Upload completed successfully, get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Delete the file from the ./uploads folder
            fs.unlinkSync(filePath);
  
            const admin_id = filename.split('.').slice(0, -1).join('.');
            const admin_details = downloadURL;
            const admin = await this.authService.updateAdminDetails(admin_id, admin_details);
  
            resolve(admin);
          } catch (error) {
            reject(new InternalServerErrorException('Something went wrong while uploading admin details.'));
          }
        }
      );
    });
  }

}
