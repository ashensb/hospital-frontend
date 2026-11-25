import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
     
      <Route path="/patient-dashboard" element={<div>Patient Dashboard (Coming Soon)</div>} />
      <Route path="/doctor-dashboard" element={<div>Doctor Dashboard (Coming Soon)</div>} />
      <Route path="/nurse-dashboard" element={<div>Nurse Dashboard (Coming Soon)</div>} />
      <Route path="/admin-dashboard" element={<div>Admin Dashboard (Coming Soon)</div>} />
    </Routes>
  );
}

export default App;