import express from 'express';
import bcrypt from 'bcrypt'
import cors from 'cors';
import auth from './routes/auth.js'
import classes from './routes/classes.js'
import attendance from './routes/attendance.js'
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', auth)
app.use('/classes', classes)
app.use('/attendance', attendance)
app.listen(5000, () => {
    console.log('Server Berjalan Pada Port 5000')
});