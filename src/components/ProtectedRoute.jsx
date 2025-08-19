// 로그인 여부를 확인하고, 로그인 안 된 경우 로그인 페이지로 리다이렉트하는 컴포넌트

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // 로그인 안 된 경우, 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }
  // 로그인 되어 있으면 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
