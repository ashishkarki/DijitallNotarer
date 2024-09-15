import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

@Injectable()
export class NotarizationService {
  private readonly s3Client: S3Client;
  private readonly dynamoDBClient: DynamoDBClient;
  private readonly bucketName = 'notary-bucket';
  private readonly logger = new Logger(NotarizationService.name);

  private readonly awsConfiguration = {
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy',
    },
  };


  constructor() {
    this.s3Client = new S3Client(this.awsConfiguration);
    this.dynamoDBClient = new DynamoDBClient(this.awsConfiguration);

    // Log the AWS configuration details
    this.logger.log(`AWS Configuration - Region: ${this.awsConfiguration.region}, Endpoint: ${this.awsConfiguration.endpoint}`);
  }

  async uploadDocument(filePath: string): Promise<boolean> {
    // check if file exists in the given path
    if (!fs.existsSync(filePath)) {
      this.logger.error(`File not found: ${filePath}`);
      throw new BadRequestException(`File doesn't exist: ${filePath}`);
    }

    this.logger.log(`NotarizationService, received request to upload document at: ${filePath}`);

    // All good, read the file content
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath); // get only the filename from the filepath

    // Prepare the S3 upload
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileContent, // send binary data (buffer) to s3
      ContentType: 'application/pdf',
    };

    try {
      // upload file to S3
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      this.logger.log(`File ${fileName} uploaded successfully to S3`);

      // and, store the metadata in dynamodb
      const timestamp = new Date().toISOString();
      const metadata: PutItemCommandInput = {
        TableName: 'Documents',
        Item: {
          DocumentID: { S: fileName },
          UploadedAt: { S: timestamp },
          Status: { S: 'Pending' },
        },
      };

      await this.dynamoDBClient.send(new PutItemCommand(metadata));
      this.logger.log(`Metadata for ${fileName} saved in DynamoDB.`);

      return true;
    } catch (error: any) {
      this.logger.error(`Error while uploading document: ${fileName}`, error.stack);
      return false;
    }
  }
}
