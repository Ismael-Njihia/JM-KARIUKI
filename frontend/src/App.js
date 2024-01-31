import Register from "./screens/Register";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Header from "./constants/Header";
import HealthDataForm from "./components/HealthDataForm";

function App() {
 return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-data" element={<HealthDataForm />} />
      </Routes>
    </Router>
 );
}

export default App;
