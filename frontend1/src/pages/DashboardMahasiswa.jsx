import './css/DashboardMahasiswa.css'
import React from 'react'

const DashboardMahasiswa = () =>{
  const [classes, setClasses] = React.useState([])
  React.useEffect(() => {
    const fetchClasses = async () => {
      try{
        let res = await fetch(`http://localhost:5000/classes/`)
        if(!res.ok){
          throw new Error('Data Gagal Didapatkan')
        }
        let data = await res.json()
        setClasses(data.data)
      }catch(err){
        console.error(`Error ${err}`)
      }
    }
    fetchClasses()
  }, [])

    return(
      <>
      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Absensi App</h3>
          <ul>
            <li className="active">Dashboard</li>
            <li>Riwayat Absensi</li>
            <li>Logout</li>
          </ul>
        </div>
      
        <div className="main-content">
          <h2>Dashboard Mahasiswa</h2>
      
          <div className="card-container">
            {classes.map(cls => 
            <div className="card" key={cls.id}>
              <h4>{cls.name}</h4>
              {cls.status === 'open' ?
              <>
              <p><span className="open">Absensi Dibuka</span></p>
              <button className="btn-primary">Absen Sekarang</button>
              </>
             : 
             <>
              <p><span className="closed">Absensi Ditutup</span></p>
              </>
            }
            
            </div>
            )} 
          </div>
        </div>
      
      </div>        
      </>
    )
}

export default DashboardMahasiswa;