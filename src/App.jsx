import './App.css'
import useDarkMode from './hooks/useDarkMode';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GoogleCallbackPage from './components/Oauth/GoogleCallbackPage';
import SignupPage from './pages/SignupPage';
import GuidelinePage from "./pages/GuidelinePage";
import ProtectedRoute from './components/ProtectedRoute';
import ChattingTopicSelectionPage from "./pages/chattingPage/ChattingTopicSelectionPage";
import ChattingPage from './pages/chattingPage/ChattingPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTopicManagement from './pages/admin/AdminTopicManagement';
import AdminLanguageManagement from './pages/admin/AdminLanguageManagement';

function App() {
  // 다크 모드
  const theme = useSelector((state) => state.theme.mode);
  useDarkMode(theme);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/google" element={<GoogleCallbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/guideline" element={<GuidelinePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/chatting/:session_id" element={<ChattingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/topic" element={<AdminTopicManagement/>} />
        <Route path="/admin/language" element={<AdminLanguageManagement />} />
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
