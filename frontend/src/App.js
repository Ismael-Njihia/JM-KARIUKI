import Register from "./screens/Register";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
 );
}

export default App;
