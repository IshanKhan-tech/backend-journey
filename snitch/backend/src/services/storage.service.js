import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config";

const client = new ImageKit({
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
});

export const uploadFile = async ({ buffer, filename, folder = "Drape" }) => {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    filename,
    folder,
  });

  return result
};
