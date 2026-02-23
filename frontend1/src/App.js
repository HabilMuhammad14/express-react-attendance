// import logo from './logo.svg';
import './App.css';
import DashboardMahasiswa from "./pages/DashboardMahasiswa";
import DashboardDosen from "./pages/DashboardDosen";
import Login from './pages/Login';
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard-mahasiswa" element={<DashboardMahasiswa />} />
      <Route path="/dashboard-dosen/:id" element={<DashboardDosen />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
