// 구글 로그인을 처리하는 페이지 컴포넌트

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../REDUX/auth/authSlice"

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const user_id = searchParams.get("user_id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!access_token) return;

    dispatch(login({ token: access_token, userId: user_id}));
    navigate("/topics");
  }, [access_token, user_id, dispatch, navigate]);

  return <div>구글 로그인 처리 중입니다...</div>;
};

export default GoogleCallbackPage;
