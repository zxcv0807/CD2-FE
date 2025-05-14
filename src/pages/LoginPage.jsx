import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../REDUX/auth/authSlice"; 
import axios from "../api/axiosInstance";
import Header from "../components/header/Header";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import formImage from "../assets/FormImage.png";
import GoogleLogin from "../assets/web_light_rd_SI@1x.png";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 입력 데이터
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    //  입력 데이터 오류 메시지
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    // 백엔드 api 연동 에러 메시지
    const [serverError, setServerError] = useState("");

    // 입력 데이터 유효 검사
    const validateField = (name, value) => {
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? "" : "유효한 이메일 주소를 입력하세요.";
        }

        if (name === "password") {
            return value ? "" : "비밀번호를 입력하세요.";
        }

        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        const errorMessage = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
        setServerError("");
    };

    // 이메일 로그인
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every((err) => err === "");
        if (!isValid) return;

        try {
            const response = await axios.post("/api/v1/user/login", {
                email: formData.email,
                password: formData.password,
            });
            const { access_token, user_id } = response.data;
            dispatch(login({token: access_token, userId: user_id}));
            navigate("/topics");
        } catch (error) {
            console.error("로그인 실패:", error);
            setServerError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };
    // 구글 로그인
    const handleGoogleLogin = async () => {
        try{
            window.location.href = "https://pbl.kro.kr/api/v1/oauth/google/login"
        } catch (error) {
            console.error("구글 로그인 URL 요청 실패:", error);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                {/* 왼쪽 영역 */}
                <div className="md:w-[600px] w-full bg-white dark:bg-[#18171C] flex flex-col justify-center px-16">
                    <h2 className="text-[#1A1A1A] dark:text-white text-3xl font-semibold mb-8">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {/* 이메일 입력 */}
                        <div className="mb-4">
                            <label className="text-[#1A1A1A] dark:text-white font-semibold">Email</label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="이메일 입력"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-[#ED4545] text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        {/* 비밀번호 입력 */}
                        <div className="mb-4">
                            <label className="text-[#1A1A1A] dark:text-white font-semibold">Password</label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="비밀번호 입력"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-[#ED4545] text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        {/* 로그인 상태 유지 */}
                        <div className="mb-4 flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <div className="w-4 h-4 rounded-full border-2 border-[#A476CC] flex items-center justify-center mr-2">
                                    <input type="checkbox" className="peer hidden" id="keepLoggedIn" />
                                    <div className="w-2 h-2 rounded-full bg-transparent peer-checked:bg-[#A476CC]" />
                                </div>
                                <span className="text-[#4E4E4E] dark:text-[#BBBBBB]">로그인 상태 유지</span>
                            </label>
                            <Link to="/" className="text-[#999999] dark:text-[#888888]">비밀번호 찾기</Link>
                        </div>
                        {serverError && (
                            <p className="text-[#ED4545] text-sm">{serverError}</p>
                        )}
                        <Button type="submit" text="로그인" />
                    </form>
                    {/* 또는 */}
                    <div className="flex items-center my-4">
                        <hr className="flex-1 border-[#DADADA]" />
                        <span className="px-4 text-[#4E4E4E] dark:text-[#BBBBBB] text-sm">또는</span>
                        <hr className="flex-1 border-[#DADADA]" />
                    </div>
                    {/* 구글 로그인 */}
                    <button onClick={handleGoogleLogin} className="flex justify-center">
                        <img src={GoogleLogin} className="w-[175px] h-auto cursor-pointer"/>
                    </button>
                    {/* 회원가입 이동 */}
                    <p className="text-center text-[#999999] dark:text-[#888888] mt-8">
                        우문현답은 처음이신가요? <Link to="/signup" className="text-[#A476CC] hover:text-[#6A4B85] dark:hover:text-[#C0A3E6]">회원가입</Link>
                    </p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="flex-1 flex-col relative hidden md:flex">
                    <div className="flex flex-1">
                        <img src={formImage} alt="Form Image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
