import { Request } from 'express'
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

export const handleUploadSingleImage = async (req: Request) => {
  // fix ES-module được dùng trong 1 common JS( do thư viện update version)
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    // lấy cả đuôi file
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid!') as any)
      }
      return valid
    }
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve(files)
    })
  })
}
