import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../REDUX/auth/authSlice"

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (!code) return;

      try {
        const response = await axios.get("https://pbl.kro.kr/api/v1/oauth/google/callback", {
          params: { code },
        });

        const { access_token, user_id } = response.data;
        dispatch(login({ token: access_token, userId: user_id}));

        navigate("/chat-start");
      } catch (error) {
        console.error("구글 로그인 콜백 처리 실패:", error);
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [code, dispatch, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default GoogleCallbackPage;
