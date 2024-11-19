import fs from 'fs/promises';
import path from 'path';

async function getAllFiles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    const fileNames = files
      .filter((file) => file.isFile()) 
      .map((file) => file.name);
    return fileNames;
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}