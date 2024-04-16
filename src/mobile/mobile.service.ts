import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert the number to a string
  // return otp; // Return the number
}

@Injectable()
export class MobileService {

  constructor(
    private configService: ConfigService,
  ) {}

  async sendOTPbyf2s(phoneNumber: string): Promise<{ msg: string }> {
    const otp = generateOTP();
    const requestData = {
      route: 'otp',
      variables_values: `${otp}`,
      numbers: `${phoneNumber}`,
    };
    const config = {
      headers: {
        Authorization:
          this.configService.get('F2S_API_KEY'),
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        requestData,
        config,
      );
      return { msg: otp };
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }
}
