const express = require('express')
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express();

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended: true}))
// app.use(cors({credentials:true, origin:"http://localhost:3000"}))
// CORS Configuration
const allowedOrigins = [
    process.env.FRONTEND_URL_DEV, // Local Development
    process.env.FRONTEND_URL_PROD // Deployed Frontend (Vercel)
  ];
  
  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))


app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)
app.get('/', (req, res) => {
    res.json({ status: "ok" });
});
connect(process.env.MONGO_URI).then(app.listen(process.env.PORT || 5000, () => console.log(`Server started on port ${process.env.PORT}`))).catch(error => {console.log(error)})

