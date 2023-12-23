const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/refresh-token', authController.validateRefreshToken)
router.get('/me', authController.getMe)
router.post('/change-password', authController.changePassword)
router.post('/reset-password', authController.resetPassword)

module.exports = router
