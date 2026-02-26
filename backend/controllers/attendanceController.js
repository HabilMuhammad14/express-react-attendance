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

const createAttendance = async (req, res) => {
    try{
      const { student_id, class_id } = req.body;

      const sessionResult = await pool.query(
        `SELECT id FROM attendance_sessions
         WHERE class_id = $1 AND status = 'open'
         LIMIT 1`,
        [class_id]
      );
      console.log(sessionResult.rows[0])
  
      if (sessionResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Absensi tidak dibuka"
        });
      }
  
      const session_id = sessionResult.rows[0].id;
    //   console.log(session_id)
  
      await pool.query(
        `INSERT INTO attendances (student_id, class_id, session_id)
         VALUES ($1, $2, $3)`,
        [student_id, class_id, session_id]
      );
  
      res.status(201).json({
        success: true,
        message: "Berhasil absen"
      });

    }catch(error){
    console.error(error);
    res.status(500).json({
    success: false,
    message: "Gagal absen"
    });
    }
}

export default {openAbsent, closeAbsent, createAttendance}
