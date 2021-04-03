import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.connect(
  process.env.MONGOOSE_URI ?? 'mongodb://mongodb:27017',
  {
    dbName: process.env.MONGOOSE_DBNAME ?? 'test',
    user: process.env.MONGOOSE_USER ?? 'user',
    pass: process.env.MONGOOSE_PASS ?? 'pass',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
