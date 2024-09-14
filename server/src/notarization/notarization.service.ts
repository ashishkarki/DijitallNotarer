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


  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      endpoint: process.env.AWS_ENDPOINT,
    });

    this.dynamoDBClient = new DynamoDBClient({
      region: 'us-east-1',
      endpoint: process.env.AWS_ENDPOINT,
    });
  }

  async uploadDocument(filePath: string): Promise<boolean> {
    // check if file exists in the given path
    if (!fs.existsSync(filePath)) {
      this.logger.error(`File not found: ${filePath}`);
      throw new BadRequestException(`File doesn't exist: ${filePath}`);
    }

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
