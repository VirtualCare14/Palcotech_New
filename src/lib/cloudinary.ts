import crypto from "crypto";

export function getCloudinaryEnv() {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const u = new URL(url);
    return {
      cloudName: u.hostname,
      apiKey: u.username,
      apiSecret: u.password,
    };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
  const apiKey = process.env.CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";
  return { cloudName, apiKey, apiSecret };
}

export function cloudinarySignature(paramsToSign: Record<string, string>, apiSecret: string) {
  const sorted = Object.keys(paramsToSign)
    .sort()
    .map((k) => `${k}=${paramsToSign[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(sorted + apiSecret).digest("hex");
}

