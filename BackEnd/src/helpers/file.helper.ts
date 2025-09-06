import { promises as fs } from 'fs';
import * as path from 'path';

export async function deleteFiles(filePaths: string[]) {
  for (const file of filePaths) {
    try {
      const fullPath = path.resolve(file);
      await fs.unlink(fullPath);
    } catch (err) {
      console.warn(`Không xóa được file: ${file}`);
    }
  }
}


/**
 * Kiểm tra danh sách đường dẫn có phải là file tồn tại hợp lệ
 */
export async function validateFilePaths(filePaths: string[]): Promise<boolean> {
  for (const file of filePaths) {
    const fullPath = path.resolve(file);
    try {
      const stat = await fs.stat(fullPath);
      if (!stat.isFile()) {
        return false
      }
      return true
    } catch (err) {
      console.warn(`❌ File không tồn tại hoặc không truy cập được: ${file}`);
    }
  }
}