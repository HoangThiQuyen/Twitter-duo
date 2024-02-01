import fs from 'fs'
import path from 'path'

export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    // create new folder
    fs.mkdirSync(uploadFolderPath, {
      recursive: true // create nested folder
    })
  }
}
