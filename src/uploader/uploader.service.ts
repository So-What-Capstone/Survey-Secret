import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class UploaderService {
  constructor() {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
  }

  async uploadToS3(file: FileUpload, userId: string, folderName: string) {
    const { filename, createReadStream } = file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: 'surveysecret',
        Key: objectName,
        ACL: 'public-read',
        Body: readStream,
      })
      .promise();

    return Location;
  }
}
