const { uploadFile, deleteFile, getFileUrl } = require('../../../utils/fileUpload')
const { auth } = require('../../../middlewares/authMiddleware')
const multer = require('multer')

module.exports = {
  uploadFile: [
    auth,
    multer().single('file'),
    async (req, res, next) => {
      try {
        const uploadedFile = await uploadFile(req.file)
        res.json(uploadedFile)
      } catch (err) {
        next(err)
      }
    },
  ],
  getFileUrl: [
    auth,
    async (req, res, next) => {
      try {
        const fileUrl = await getFileUrl(req.params.fileKey)
        if (fileUrl) {
          res.json({ url: fileUrl })
        } else {
          res.status(404).end()
        }
      } catch (err) {
        next(err)
      }
    },
  ],
  getFileMedia: [
    auth,
    async (req, res, next) => {
      try {
        const fileUrl = await getFileUrl(req.params.fileKey)
        if (fileUrl) {
          res.redirect(fileUrl)
        } else {
          res.status(404).end()
        }
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteFile: [
    auth,
    async (req, res, next) => {
      try {
        await deleteFile(req.params.fileKey)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
}
