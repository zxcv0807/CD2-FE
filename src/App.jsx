import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import ChattingSubjectSelectionPage from "./pages/chattingPage/ChattingSubjectSelectionPage";
import GuidelinePage from "./pages/GuidelinePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chattingSubjectSelectionPage" element={<ChattingSubjectSelectionPage />} />
        <Route path="/guideline" element={<GuidelinePage />} />
      </Routes>
    </Router>
  )
}

export default App
