const express = require('express')
const { userRouter } = require('./userRoutes')
const { addressRoute } = require('./addressRoutes')
const router = express.Router()

router.use('/user',userRouter)
router.use('/address',addressRoute)

module.exports = router