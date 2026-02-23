import pool from '../config/db.js';

const openAbsent = async (req, res) =>{
    try{
        let result = await pool.query(
            'UPDATE attendance_sessions SET status = $1 WHERE class_id = $2 RETURNING*', ['open', req.params.id]
            
        )
        console.log(result.rows[0])
        
        res.status(201).json({
            succes: true,
            message: 'Berhasil Diperbarui'
        })
    }catch(error){
        res.status(500).json({
            succes: false,
            message: 'Gagal Memperbarui Data'
        })
        console.log(error)
    }
}
const closeAbsent = async (req, res) =>{
    try{
        let result = await pool.query(
            'UPDATE attendance_sessions SET status = $1 WHERE class_id = $2 RETURNING*', ['closed', req.params.id]
            
        )
        console.log(result.rows[0])

        res.status(201).json({
            succes: true,
            message: 'Berhasil Diperbarui'
        })
    }catch(error){
        res.status(500).json({
            succes: false,
            message: 'Gagal Memperbarui Data'
        })
        console.log(error)
    }
}

export default {openAbsent, closeAbsent}