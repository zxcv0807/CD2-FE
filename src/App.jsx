import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GoogleCallbackPage from './components/Oauth/GoogleCallbackPage';
import SignupPage from './pages/SignupPage';
import GuidelinePage from "./pages/GuidelinePage";
import ProtectedRoute from './components/ProtectedRoute';
import ChattingTopicSelectionPage from "./pages/chattingPage/ChattingTopicSelectionPage";
import ChattingPage from './pages/chattingPage/ChattingPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/google" element={<GoogleCallbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/guideline" element={<GuidelinePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* <Route path="/chat-start" element={<ChattingTopicSelectionPage />} /> */}
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/chatting/:session_id" element={<ChattingPage />} />
        <Route 
          path="/chat-start" 
          element={
            <ProtectedRoute>
              <ChattingTopicSelectionPage />
            </ProtectedRoute>
          } />
        {/* <Route 
          path="/chatting" 
          element={
            <ProtectedRoute>
              <ChattingPage />
            </ProtectedRoute>
          } /> */}
      </Routes>
    </Router>
  )
}

export default App
