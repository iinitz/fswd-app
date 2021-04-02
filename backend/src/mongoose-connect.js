import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.connect(
  'mongodb://mongodb:27017',
  {
    dbName: 'test',
    user: 'user',
    pass: 'pass',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
