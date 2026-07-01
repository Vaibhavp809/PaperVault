import streamifier from "streamifier";
import cloudinary, { configureCloudinary } from "../config/cloudinary.js";

const ensureCloudinaryConfig = () => {
  const required = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET"
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    const error = new Error(`Cloudinary is not configured. Missing: ${missing.join(", ")}`);
    error.statusCode = 503;
    throw error;
  }
};

export const uploadPdfToCloudinary = (fileBuffer, originalName) => {
  ensureCloudinaryConfig();
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "papervault/papers",
        resource_type: "raw",
        format: "pdf",
        public_id: `${Date.now()}-${originalName.replace(/\.pdf$/i, "").replace(/[^a-z0-9-]/gi, "-")}`
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const buildSignedPdfUrl = (publicId, options = {}) => {
  ensureCloudinaryConfig();
  configureCloudinary();

  return cloudinary.url(publicId, {
    resource_type: "raw",
    type: "upload",
    secure: true,
    sign_url: true,
    flags: options.download ? "attachment" : undefined,
    attachment: options.download ? options.fileName : undefined
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
};
