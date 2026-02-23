import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    const {nama, email, password, role} = req.body;
    if(!nama || !email || !password || !role){
        return res.status(400).json({
            succes: false,
            message: 'Data yang dimasukkan belum lengkap!!!'
        })
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try{
        let result = await pool.query(
            'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',[nama, email, hashedPassword, role]
        )
        res.status(201).json({
            succes: true,
            message: 'Registrasi Berhasil',
            data: result.rows[0]
        })
    }catch(error){
        res.status(500).json({
            succes: false,
            message: 'Data Gagal Dikirim'
        })
    }
}

const login = async (req, res) =>{
    let {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            succes: false,
            message: 'Data yang dimasukkan belum lengkap!!!'
        })
    }


    try{
        let result = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email] 
        )
        if(result.rows.length == 0){
            res.status(401).json({succes : false, message: 'Email atau Password Yang Dimasukkan Salah!!!'})
        }
        const isValidPassword = await bcrypt.compare(password, result.rows[0].password)
         if(!isValidPassword){
            return res.status(401).json({succes: false, message: 'Email atau Password Yang Dimasukkan Salah!!!'})
         }
         res.status(200).json({
            succes: true,
            message: 'Login Berhasil',
            role: result.rows[0].role,
            id: result.rows[0].id
         })
    }catch(error){
        console.error(error);
        res.status(500).json({
            succes: false, 
            message: 'Server Error'
        })
    }
}

export default {register, login}
