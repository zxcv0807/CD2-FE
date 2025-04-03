import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import formImage from "../assets/formImage.png"
import GoogleLogin from "../assets/web_light_rd_SI@1x.png";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("로그인 시도", formData);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                {/* 왼쪽 영역역 */}
                <div className="w-[600px] bg-white flex flex-col justify-center px-16">
                    {/* 왼쪽 회원가입 폼 */}
                    <h2 className="text-3xl font-semibold mb-8">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-gray-700 font-semibold">Email</label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="이메일 입력"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 font-semibold">Password</label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="비밀번호 입력"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-gray-600">
                                <input type="checkbox" className="mr-2" /> 로그인 상태 유지
                            </label>
                            <Link to="/" className="text-[#999999]">비밀번호찾기</Link>
                        </div>
                        <Button type="submit" text="로그인" />
                        {/* 또는 */}
                        <div className="flex items-center my-1">
                            <hr className="flex-1 border-[#DADADA]" />
                            <span className="px-4 text-gray-500 text-sm">또는</span>
                            <hr className="flex-1 border-[#DADADA]" />
                        </div>
                        {/* 구글 로그인 */}
                        <div className="flex justify-center">
                            <img src={GoogleLogin} className="w-[175px] h-auto cursor-pointer"/>
                        </div>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        우문현답은 처음이신가요? <Link to="/signup" className="text-[#A476CC]">회원가입</Link>
                    </p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="flex-1 flex flex-col relative">
                    {/* 오른쪽쪽 이미지 */}
                    <div className="flex flex-1">
                        <img src={formImage} alt="Form Image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
