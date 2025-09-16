
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createS3Client, getBucketConfig } from "./aws-config"

const s3Client = createS3Client()
const { bucketName, folderPrefix } = getBucketConfig()

export async function uploadFile(buffer: Buffer, fileName: string) {
  const key = `${folderPrefix}uploads/${Date.now()}-${fileName}`
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
  })

  await s3Client.send(command)
  return key
}

export async function downloadFile(key: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  await s3Client.send(command)
  return true
}

export async function renameFile(oldKey: string, newKey: string) {
  // S3 doesn't have rename, so we copy and delete
  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    Key: newKey,
    CopySource: `${bucketName}/${oldKey}`,
  })

  await s3Client.send(copyCommand)
  await deleteFile(oldKey)
  return newKey
}
