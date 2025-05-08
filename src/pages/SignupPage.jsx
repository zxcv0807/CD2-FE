import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import Header from "../components/header/Header";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import PrivacyModal from "../components/modal/PrivacyModal";
import formImage from "../assets/formImage.png";

const SignupPage = () => {
    const navigate = useNavigate();
    // 입력 데이터
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    // 입력 데이터에 대한 에러 메시지
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        privacyAgree: "",
    });
    // 백엔드와 api연동 에러 메시지
    const [apiError, setApiError] = useState("");
    // 모달 관련
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

    // 입력 필드 검증
    const validateField = (name, value) => {
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "유효한 이메일 주소를 입력하세요.";
            }
            return "";
        }
    
        if (name === "password") {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
            if (!passwordRegex.test(value)) {
                return "비밀번호는 6~20자이며, 영문과 숫자를 포함해야 합니다.";
            }
            return "";
        }
    
        if (name === "confirmPassword") {
            return value !== formData.password ? "비밀번호가 일치하지 않습니다." : "";
        }
    
        return "";
    };
    
    // 사용자에게 입력 받기
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        const fieldError = validateField(name, value);
        setErrors({ ...errors, [name]: fieldError });

        if (name === "password" && formData.confirmPassword) {
            const confirmError = value === formData.confirmPassword ? "" : "비밀번호가 일치하지 않습니다.";
            setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
            confirmPassword: validateField("confirmPassword", formData.confirmPassword),
            privacyAgree: agreedToPrivacy ? "" : "개인정보 이용에 동의하셔야 합니다.",
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every((error) => error === "");
        if (!isValid) return;

        try {
            const response = await axios.post("/api/v1/user/signup", {
                email: formData.email,
                password: formData.password,
                confirm_pwd: formData.confirmPassword,
            });

            console.log("회원가입 성공:", response.data);
            navigate("/login");

        } catch (error) {
            console.error("회원가입 실패:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setApiError(error.response.data.message);
            } else {
                setApiError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 모달 관련 함수
    const handleAgreePrivacy = () => {
        setAgreedToPrivacy(true);
        setIsPrivacyModalOpen(false);

        setErrors((prev) => ({
            ...prev,
            privacyAgree: "",
        }));
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className="w-[600px] bg-white dark:bg-[#18171C] flex flex-col justify-center px-16">
                    <h2 className="text-[#1A1A1A] dark:text-white text-3xl font-semibold mb-8">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* 이메일 입력 */}
                        <div>
                            <label className="text-[#1A1A1A] dark:text-white font-semibold">Email</label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="이메일 입력"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-[#ED4545] text-sm mt-1">{errors.email}</p>}
                        </div>
                        {/* 비밀번호 입력 */}
                        <div>
                            <label className="text-[#1A1A1A] dark:text-white font-semibold">Password</label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="비밀번호 입력"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-[#ED4545] text-sm mt-1">{errors.password}</p>}
                        </div>
                        {/* 비밀번호 확인 */}
                        <div>
                            <label className="text-[#1A1A1A] dark:text-white font-semibold">Verify Password</label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="비밀번호 확인"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="text-[#ED4545] text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                        {/* 개인정보 이용 동의 */}
                        <div className="flex flex-col gap-1 mb-2">
                            <div className="flex items-center gap-2">
                                {/* 숨겨진 체크박스 */}
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    checked={agreedToPrivacy}
                                    readOnly // 직접 바꾸지 못하게 막음
                                    className="hidden"
                                />
                                
                                {/* 커스텀 체크박스 UI */}
                                <div
                                    className="w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#A476CC] cursor-pointer"
                                    onClick={() => setIsPrivacyModalOpen(true)} // 클릭 시 모달 열기
                                >
                                    {agreedToPrivacy && (
                                        <div className="w-2 h-2 bg-[#A476CC] rounded-full" />
                                    )}
                                </div>

                                {/* 텍스트 클릭해도 모달 열기 */}
                                <label
                                    htmlFor="privacy"
                                    className="text-sm text-[#1A1A1A] dark:text-white cursor-pointer underline"
                                    onClick={() => setIsPrivacyModalOpen(true)}
                                >
                                    개인정보 이용 동의
                                </label>
                            </div>

                            {/* 에러 메시지 */}
                            {errors.privacyAgree && (
                                <p className="text-[#ED4545] text-sm mt-1">{errors.privacyAgree}</p>
                            )}
                        </div>

                        {/* api 에러 출력 */}
                        {apiError && (
                            <p className="text-[#ED4545] text-sm mt-2">{apiError}</p>
                        )}

                        <Button type="submit" text="회원가입" />
                    </form>
                </div>
                {/* 오른쪽 이미지 */}
                <div className="flex-1 flex flex-col relative">
                    <div className="flex flex-1">
                        <img src={formImage} alt="Form Image" />
                    </div>
                </div>
            </div>
            {/* 모달 띄우기 */}
            {isPrivacyModalOpen && (
                <PrivacyModal
                    onClose={() => setIsPrivacyModalOpen(false)}
                    onAgree={handleAgreePrivacy}
                />
            )}
        </div>
    );
};

export default SignupPage;
