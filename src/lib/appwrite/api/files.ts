import { ID, ImageGravity } from 'appwrite';
import { appwriteConfig, storage } from '../config';

function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteFile(fileId: string) {
  try {
    const result = await storage.deleteFile(appwriteConfig.storageId, fileId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getFilePreview, uploadFile, deleteFile };
