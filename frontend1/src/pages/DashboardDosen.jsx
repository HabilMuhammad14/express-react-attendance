import './css/DashboardDosen.css'
import React from 'react';
import { useParams } from 'react-router-dom';
const DashboardDosen = () =>{
  const {id} = useParams();
  const [classes, setClasses] = React.useState([])
  const [status, setStatus] = React.useState(false)

  React.useEffect(() => {
    const fetchClasses = async () => {
      try{
        let response = await fetch(`http://localhost:5000/classes/${id}`)
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setClasses(data.data);

      }catch(error){
        console.error('Error fetching classes:', error);
      }
    }
    fetchClasses();
  }, [])
  React.useEffect(() => {
    const fetchClasses = async () => {
      try{
        let response = await fetch(`http://localhost:5000/classes/${id}`)
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setClasses(data.data);

      }catch(error){
        console.error('Error fetching classes:', error);
      }
    }
    fetchClasses();
  }, [status])
  const handleOpen = async (e) =>{
    try{
      await fetch(`http://localhost:5000/attendance/open/${e.target.id}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          status: 'open'
        })
      })
      setStatus(!status)
    }catch(err){
      console.error("Gagal!!!")
    }
  }
  const handleClose = async (e) => {
    try{
      await fetch(`http://localhost:5000/attendance/close/${e.target.id}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          status: 'close'
        })
      })
      setStatus(!status)
    }catch(err){
      console.error("Gagal!!!")
    }
  }
    return(
        <div className="dashboard-container">
        
          <div className="sidebar">
            <h3>Absensi App</h3>
            <ul>
              <li className="active">Dashboard</li>
              <li>Kelola Absensi</li>
              <li>Logout</li>
            </ul>
          </div>
        
          <div className="main-content">
            <h2>Dashboard Dosen</h2>
            <div className="table-card">
              <h4>Kelas Yang Diajar</h4>
        
              <table>
                <thead>
                  <tr>
                    <th>Mata Kuliah</th>
                    <th>Status Absensi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => 
                    <tr key={cls.id}>
                      <td>{cls.name}</td>
                      <td><span className={cls.status === 'open' ? 'open' : 'closed'}>{cls.status === 'open' ? 'Dibuka' : 'Ditutup'}</span></td>
                      <td>
                        {cls.status === 'open' ? 
                      <button className='btn-danger' onClick={handleClose} id={cls.id}>{'Tutup'}</button> :   <button className='btn-primary' onClick={handleOpen} id={cls.id}>{'Buka'}</button> 
                      }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        
        </div>
    )
}
export default DashboardDosen;