const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require ('express')
const app = express()
const connectToDb = require('./db/db')

const mapRoutes = require('./routes/maps.routes')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const rideRoutes = require('./routes/ride.routes')

const cookieParser = require('cookie-parser')



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

connectToDb();

app.get('/',(req,res)=>{ 
  res.send('Hello')
});

app.use('/maps',mapRoutes)
app.use('/users',userRoutes)
app.use('/captain',captainRoutes)
app.use('/ride',rideRoutes)


/*  */

module.exports =app;