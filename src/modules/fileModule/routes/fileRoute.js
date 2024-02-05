const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')

router.post('/', fileController.uploadFile)
router.get('/:fileKey', fileController.getFileUrl)
router.get('/media/:fileKey', fileController.getFileMedia)
router.delete('/:fileKey', fileController.deleteFile)

module.exports = router
