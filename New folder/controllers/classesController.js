import pool from '../config/db.js';

const getAllClassesByID = async (req, res) => {
    try{
        let result = await pool.query(`
          SELECT 
            c.id,
            c.name,
            COALESCE(a.status, 'closed') AS status
          FROM classes c
          LEFT JOIN attendance_sessions a 
            ON a.class_id = c.id
          WHERE c.lecturer_id = $1
        `, [req.params.id]);
        res.status(200).json({
            success: true,
            data: result.rows
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Data Gagal Dikirim'
        })
    }
}

const getAllClassesForMhs = async (req, res) =>{
    try{
        let result = await pool.query(
            'SELECT c.id, c.name, a.status FROM classes c LEFT JOIN attendance_sessions a ON c.id = a.class_id'
        )
        if(result.rows.length === 0){
            res.status(500).json({
            succes: false,
            message: 'Data Gagal Didapatkan'
        })
        }
        res.status(200).json(
            {
                succes: true,
                data: result.rows
            }
        )
        console.log(result.rows)
    }catch(err){
        res.status(500).json(
            {
                succes: false,
                message: 'Data Gagal Didapatkan!!!'
            }
        )
    }
}

export default {getAllClassesByID, getAllClassesForMhs}