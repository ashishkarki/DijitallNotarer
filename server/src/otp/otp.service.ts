import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OperationResult } from '../models/operation-result.dto';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const otpGenerator = require('otp-generator');

@Injectable()
export class OtpService {
  constructor(private readonly prismaService: PrismaService) {}

  // Generates the OTP
  async generateOtp(
    email: string,
  ): Promise<OperationResult & { otp?: string }> {
    let otp: string = '';

    // Step 1: Generate the OTP to be sent to the user
    try {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
    } catch (otpError: any) {
      console.error(`Error in generating Otp: ${otpError.message}`);
      return new OperationResult(
        false,
        `Error generating OTP: ${otpError.message}`,
      );
    }

    // Step 2: Set expiration time for OTP
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // expires in 10 minutes

    // Step 3: Update the user record with OTP and expiration
    try {
      await this.prismaService.user.update({
        where: { email },
        data: { otp, otpExpires },
      });
    } catch (dbError: any) {
      console.error(
        `Database error when updating OTP for user, ${email}: ${dbError.message}`,
      );
      return new OperationResult(
        false,
        `Database error when updating OTP for user, ${email}: ${dbError.message}`,
      );
    }

    // Step 4: Return OperationResult with OTP in a separate field
    return { ...new OperationResult(true, 'OTP generated successfully'), otp };
  }

  // Method to send OTP via email, now accepts OTP as a parameter
  async sendOtpEmail(email: string, otp: string): Promise<OperationResult> {
    console.log('sendOtpEmail, EMAIL_USER:', process.env.EMAIL_USER);
    console.log('sendOtpEmail, EMAIL_PASS:', process.env.EMAIL_PASS);

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Specifies that we are using Gmail's SMTP to send emails
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP Code is: ${otp}`,
      };

      const info = await transporter.sendMail(mailOptions);

      return new OperationResult(
        true,
        `Email sent successfully: ${info.response}`,
      );
    } catch (error: any) {
      console.error(`Error sending email: ${error}`);
      return new OperationResult(
        false,
        `Error sending email: ${error.message}`,
      );
    }
  }

  // Method to verify OTP and return OperationResult
  async verifyOtp(email: string, otp: string): Promise<OperationResult> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (user && user.otp === otp && user.otpExpires > new Date()) {
        // If OTP is successfully verified, reset the OTP and its expiration for this user
        await this.prismaService.user.update({
          where: { email },
          data: { otp: null, otpExpires: null, emailVerified: true },
        });

        return new OperationResult(true, 'OTP verified successfully');
      } else {
        return new OperationResult(false, `Error verifying OTP: ${otp}`);
      }
    } catch (error: any) {
      console.error(`Error verifying OTP: ${error}`);
      return new OperationResult(
        false,
        `Error verifying OTP: ${error.message}`,
      );
    }
  }
}
