import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GoogleCallbackPage from './components/Oauth/GoogleCallbackPage';
import SignupPage from './pages/SignupPage';
import GuidelinePage from "./pages/GuidelinePage";
import ProtectedRoute from './components/ProtectedRoute';
import ChattingSubjectSelectionPage from "./pages/chattingPage/ChattingSubjectSelectionPage";
import ChattingPage from './pages/chattingPage/ChattingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/google" element={<GoogleCallbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/guideline" element={<GuidelinePage />} />
        <Route 
          path="/chat-start" 
          element={
            <ProtectedRoute>
              <ChattingSubjectSelectionPage />
            </ProtectedRoute>
          } />
        <Route 
          path="/chatting" 
          element={
            <ProtectedRoute>
              <ChattingPage />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App
