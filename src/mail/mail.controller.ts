import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactUsDto } from './dto/contact-us.dto';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact-us')
  @UseGuards(ThrottlerGuard)
  async contactUs(@Body() contactUsDto: ContactUsDto): Promise<void> {
    try {
      await this.mailService.sendNewContactUsForm(contactUsDto);
    } catch (error) {
      throw new InternalServerErrorException('Can not send the form!');
    }
  }

  @Post('verify-email')
  @UseGuards(ThrottlerGuard)
  async verifyEmail(@Body('email') email: string): Promise<{ msg: string }> {
    try {
      const msg = await this.mailService.sendOtp(email);
      return msg;
    } catch (error) {
      throw new InternalServerErrorException('Can not send otp!');
    }
  }

  @Post('/fg-usr/verify-email')
  @UseGuards(ThrottlerGuard)
  async verifyEmailFgUsr(
    @Body('email') email: string,
  ): Promise<{ msg: string }> {
    try {
      const msg = await this.mailService.sendOtpFgUsr(email);
      return msg;
    } catch (error) {
      throw new InternalServerErrorException('Can not send otp!');
    }
  }

  @Post('/fg-psw/verify-email')
  @UseGuards(ThrottlerGuard)
  async verifyEmailFgPsw(
    @Body('email') email: string,
  ): Promise<{ msg: string }> {
    try {
      const msg = await this.mailService.sendOtpFgPsw(email);
      return msg;
    } catch (error) {
      throw new InternalServerErrorException('Can not send otp!');
    }
  }

  @Post('/fg-usr/send-usrname')
  @UseGuards(ThrottlerGuard)
  async sendUsernames(@Body('email') email: string): Promise<void> {
    await this.mailService.sendUsernames(email);
  }

  @Get('/fg-usr/send-usrname/:email')
  @UseGuards(ThrottlerGuard)
  async getUsernames(@Param('email') email: string): Promise<string> {
    const usernames = await this.mailService.getUsernames(email);
    return usernames;
  }

  @Post('/notification/create-staff')
  @UseGuards(AuthGuard('admin-jwt'))
  async notificationOfCreateStaff(@Body('username') username: string, @Body('password') password: string): Promise<void> {
    await this.mailService.sendNotificationOfCreateNewStaff(username, password);
  }

  @Post('/notification/create-admin')
  @UseGuards(AuthGuard('admin-jwt'))
  async notificationOfCreateAdmin(@Body('username') username: string, @Body('password') password: string): Promise<void> {
    await this.mailService.sendNotificationOfCreateNewAdmin(username, password);
  }
}
