import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import ChattingSubjectSelectionPage from "./pages/chattingPage/ChattingSubjectSelectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chattingSubjectSelectionPage" element={<ChattingSubjectSelectionPage />} />
      </Routes>
    </Router>
  )
}

export default App
