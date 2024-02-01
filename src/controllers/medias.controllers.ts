import { NextFunction, Request, Response } from 'express'
import path from 'path'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  // fix ES-module được dùng trong 1 common JS( do thư viện update version)
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    // lấy cả đuôi file
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300KB
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    res.json({
      message: 'Upload image successfully'
    })
  })
}
