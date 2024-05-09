require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const apiRouter = express.Router()
const morgan = require('morgan')
const connectDB = require('./db')

const PORT = process.env.PORT || 5001

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

const errorException = require('./middlewares/errorException')
const authRouter = require('./modules/userModule/routes/authRoute')
const userRouter = require('./modules/userModule/routes/userRoute')
const examsetRouter = require('./modules/examsetModule/routes/examsetRoute')
const examsetitemRouter = require('./modules/examsetModule/routes/examsetitemRoute')
const examsetitemCategoryRouter = require('./modules/examsetModule/routes/examsetitemCategoryRoute')
const enrollRouter = require('./modules/examsetModule/routes/enrollRoute')
const enrollitemRouter = require('./modules/examsetModule/routes/enrollitemRoute')
const fileRouter = require('./modules/fileModule/routes/fileRoute')
const evaluateRouter = require('./modules/examsetModule/routes/evaluateRoute')
const evaluateitemRouter = require('./modules/examsetModule/routes/evaluateitemRoute')
const reportRouter = require('./modules/reportModule/routes/reportRoute')
const reviewRouter = require('./modules/reviewModule/routes/reviewRoute')
const reviewsetRouter = require('./modules/reviewModule/routes/reviewsetRoute')

app.get('/', (req, res) => {
  res.send('Hello This is Digital Intelligence Test Application API.')
})
app.use('/api', apiRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/examset', examsetRouter)
apiRouter.use('/examsetitem', examsetitemRouter)
apiRouter.use('/examsetitem-category', examsetitemCategoryRouter)
apiRouter.use('/enroll', enrollRouter)
apiRouter.use('/enrollitem', enrollitemRouter)
apiRouter.use('/file', fileRouter)
apiRouter.use('/evaluate', evaluateRouter)
apiRouter.use('/evaluateitem', evaluateitemRouter)
apiRouter.use('/report', reportRouter)
apiRouter.use('/review', reviewRouter)
apiRouter.use('/reviewset', reviewsetRouter)

app.use(errorException)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
