import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NotarizationService {
  private readonly s3Client: S3Client;
  private readonly dynamoDBClient: DynamoDBClient;
  private readonly bucketName = 'notary-bucket';
  private readonly logger = new Logger(NotarizationService.name);

  private readonly awsConfiguration = {
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT || 'http://localstack:4566',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    },
  };

  constructor() {
    // AWS SDK S3 and DynamoDB setup
    this.s3Client = new S3Client({ ...this.awsConfiguration, forcePathStyle: true });
    this.dynamoDBClient = new DynamoDBClient(this.awsConfiguration);

    this.logger.log(`AWS Configuration - Region: ${this.awsConfiguration.region}, Endpoint: ${this.awsConfiguration.endpoint}`);
  }

  async uploadDocument(filePath: string): Promise<boolean> {
    // Resolve the full path of the file
    const absoluteFilePath = path.resolve(filePath);

    // Check if the file exists in the given path
    if (!fs.existsSync(absoluteFilePath)) {
      this.logger.error(`File not found: ${absoluteFilePath}`);
      throw new BadRequestException(`File doesn't exist: ${absoluteFilePath}`);
    }

    this.logger.log(`NotarizationService, received request to upload document at: ${absoluteFilePath}`);

    // Read the file content
    const fileContent = fs.readFileSync(absoluteFilePath);
    const fileName = path.basename(absoluteFilePath); // Extract the filename from the path

    // Prepare S3 upload parameters
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/pdf',
    };

    try {
      // Upload file to S3
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      this.logger.log(`File ${fileName} uploaded successfully to S3`);
    } catch (s3Error: any) {
      this.logger.error(`Error while uploading document to S3: ${fileName}`, s3Error.stack);
      return false;
    }

    // now try storing the metadata in dynamoDB
    try {
      // Store metadata in DynamoDB
      const timestamp = new Date().toISOString();
      const metadata: PutItemCommandInput = {
        TableName: 'notary-metadata',
        Item: {
          DocumentID: { S: fileName },
          UploadedAt: { S: timestamp },
          Status: { S: 'Pending' },
        },
      };

      await this.dynamoDBClient.send(new PutItemCommand(metadata));
      this.logger.log(`Metadata for ${fileName} saved in DynamoDB.`);
    } catch (dynamoError: any) {
      this.logger.error(`Error while saving metadata to DynamoDB: ${fileName}`, dynamoError.stack);
      return false;
    }

    return true;
  }
}
