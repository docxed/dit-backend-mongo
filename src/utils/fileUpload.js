const {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
const bucketName = process.env.AWS_BUCKET_NAME

async function uploadFile(file) {
  const fileKey = `${Date.now()}-${file.originalname}`
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  })
  await s3Client.send(command)
  return {
    name: file.originalname,
    key: fileKey,
    type: file.mimetype,
    size: file.size,
  }
}
async function getFileUrl(fileKey) {
  const headCommand = new HeadObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  })
  try {
    await s3Client.send(headCommand)
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    })
    return await getSignedUrl(s3Client, command, { expiresIn: 7 * 24 * 60 * 60 })
  } catch (err) {
    return null
  }
}
async function deleteFile(fileKey) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  })
  await s3Client.send(command)
}

module.exports = {
  uploadFile,
  getFileUrl,
  deleteFile,
}
