import { Storage } from '@google-cloud/storage';
import { randomBytes } from 'node:crypto';

const storage = new Storage();
const bucketName = 'cloudrc-users-profile-pictures';
const bucket = storage.bucket(bucketName);

export async function uploadFileToGCS(
  buffer: Buffer,
  originalFileName: string,
  mimeType: string
): Promise<string> {
  const fileExtension = originalFileName.split('.').pop() || 'jpg';
  const uniqueFileName = `${randomBytes(8).toString('hex')}-${Date.now()}.${fileExtension}`;
  const file = bucket.file(uniqueFileName);

  await file.save(buffer, {
    metadata: {
      contentType: mimeType,
    },
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
  return publicUrl;
}
