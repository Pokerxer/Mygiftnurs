import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const CLOUDINARY_FOLDER = "mygiftnurs"

export async function uploadImage(
  file: Buffer,
  options: {
    folder?: string
    publicId?: string
    transformation?: string
  } = {}
) {
  const folder = options.folder
    ? `${CLOUDINARY_FOLDER}/${options.folder}`
    : CLOUDINARY_FOLDER

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: options.publicId,
        resource_type: "image",
        transformation: options.transformation
          ? [{ fetch_format: "auto", quality: "auto" }]
          : [{ width: 800, height: 800, crop: "limit", fetch_format: "auto", quality: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve({
          url: result!.secure_url,
          publicId: result!.public_id,
        })
      }
    )
    stream.end(file)
  })
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
}

export default cloudinary
