import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'node:path';
import { OperationResult } from '../models/operation-result.dto';

@Injectable()
export class NotarizationService {
  private readonly s3Client: S3Client;
  private readonly bucketName = 'notary-bucket';
  private readonly logger = new Logger(NotarizationService.name);

  private readonly awsConfiguration = {
    region: process.env.AWS_REGION || 'us-east-1', // Set any region (MinIO doesn't care about the region)
    endpoint: process.env.AWS_ENDPOINT || 'http://minio:9000', // MinIO endpoint
    credentials: {
      accessKeyId: process.env.MINIO_ACCESS_KEY,
      secretAccessKey: process.env.MINIO_SECRET_KEY,
    },
  };

  constructor() {
    // Initialize the S3 client with MinIO credentials and endpoint
    this.s3Client = new S3Client({ ...this.awsConfiguration, forcePathStyle: true });
    this.logger.log('S3Client initialized with MinIO configuration');
  }

  async uploadDocument(filePath: string): Promise<OperationResult> {
    // Resolve the full path of the file
    const absoluteFilePath = path.resolve(filePath);

    // // Step 1: Check if the file exists
    if (!fs.existsSync(absoluteFilePath)) {
      const message = `File doesn't exist: ${absoluteFilePath}`;
      this.logger.error(message);
      
      return new OperationResult(false, message);
    }

    this.logger.log(`NotarizationService, received request to upload document at: ${absoluteFilePath}`);

    const fileStream = fs.createReadStream(absoluteFilePath); // Use the absolute file path for streaming
    const params = {
      Bucket: this.bucketName,
      Key: path.basename(absoluteFilePath), // Use the file name as the S3 key
      Body: fileStream,
    };

    // Step 2: Check if the bucket exists
    try {
      this.logger.log(`Checking if bucket "${this.bucketName}" exists...`);
      const bucketExists = await this.s3Client
        .send(new HeadBucketCommand({ Bucket: params.Bucket }))
        .catch(() => false);
      if (!bucketExists) {
        this.logger.warn(`Bucket "${this.bucketName}" not found. Creating it...`);
        await this.s3Client.send(new CreateBucketCommand({ Bucket: params.Bucket }));
        this.logger.log(`Bucket "${this.bucketName}" created successfully.`);
      }
    } catch (error: any) {
      const errorMessage = `Error creating or checking bucket: ${error.message}`;
      this.logger.error(errorMessage, error.stack);
      
      return new OperationResult(false, errorMessage);  // Return failure result
    }

    // Step 3: Upload the file
    try {
      this.logger.log(`Uploading file "${params.Key}" to bucket "${params.Bucket}"...`);
      await this.s3Client.send(new PutObjectCommand(params));
      const successMessage = `File "${params.Key}" uploaded successfully to bucket "${params.Bucket}".`;
      this.logger.log(successMessage);
      
      return new OperationResult(true, successMessage);  // Return success result
    } catch (error: any) {
      const errorMessage = `Error uploading file "${params.Key}" to MinIO: ${error.message}`;
      this.logger.error(errorMessage, error.stack);
      
      return new OperationResult(false, errorMessage);  // Return failure result
    }
  }
}
