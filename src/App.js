import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './views/LoginPage/LoginPage';
import MainPage from './views/MainPage/MainPage';
import ResetPasswordPage from './views/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
