import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import formImage from "../assets/formImage.png";
import GoogleLogin from "../assets/web_light_rd_SI@1x.png";
import { login } from "../redux/auth/authSlice"; 

const LoginPage = () => {
    const dispatch = useDispatch();
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
            const response = await axios.post("/api/login", {
                email: formData.email,
                password: formData.password,
            });

            const { token } = response.data; // 백엔드에서 받은 토큰

            // 토큰 저장 (localStorage or sessionStorage)
            localStorage.setItem("token", token);

            // 로그인 상태 Redux에 반영
            dispatch(login());

            // 리디렉션 등 추가 가능
            console.log("로그인 성공:", response.data);
        } catch (error) {
            console.error("로그인 실패:", error);
            setServerError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };
    // 구글 로그인
    const handleGoogleLogin = () => {
        console.log("구글 로그인");
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                {/* 왼쪽 영역 */}
                <div className="w-[600px] bg-white flex flex-col justify-center px-16">
                    <h2 className="text-[#1A1A1A] text-3xl font-semibold mb-8">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {/* 이메일 입력 */}
                        <div className="mb-4">
                            <label className="text-[#1A1A1A] font-semibold">Email</label>
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
                            <label className="text-[#1A1A1A] font-semibold">Password</label>
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
                            <label className="flex items-center text-[#4E4E4E]">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-[#4E4E4E]">로그인 상태 유지</span>
                            </label>
                            <Link to="/" className="text-[#999999]">비밀번호 찾기</Link>
                        </div>
                        {serverError && (
                            <p className="text-[#ED4545] text-sm">{serverError}</p>
                        )}
                        <Button type="submit" text="로그인" />
                    </form>
                    {/* 또는 */}
                    <div className="flex items-center my-4">
                        <hr className="flex-1 border-[#DADADA]" />
                        <span className="px-4 text-[#4E4E4E] text-sm">또는</span>
                        <hr className="flex-1 border-[#DADADA]" />
                    </div>
                    {/* 구글 로그인 */}
                    <button onClick={handleGoogleLogin} className="flex justify-center">
                        <img src={GoogleLogin} className="w-[175px] h-auto cursor-pointer"/>
                    </button>
                    {/* 회원가입 이동 */}
                    <p className="text-center text-[#999999] mt-8">
                        우문현답은 처음이신가요? <Link to="/signup" className="text-[#A476CC]">회원가입</Link>
                    </p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="flex-1 flex flex-col relative">
                    <div className="flex flex-1">
                        <img src={formImage} alt="Form Image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
