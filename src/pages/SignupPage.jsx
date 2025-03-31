import { useState } from "react";
import Header from "../components/header/Header";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import formImage from "../assets/formImage.png"

const SignupPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("회원가입 데이터", formData);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                {/* 왼쪽 영역 */}
                <div className="w-[600px] bg-white flex flex-col justify-center px-16">
                    {/* 왼쪽 회원가입 폼 */}
                    <h2 className="text-3xl font-semibold mb-8">Sign Up</h2>
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
                        <div>
                            <label className="text-gray-700 font-semibold">Vertify Password</label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="비밀번호 확인"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" text="회원가입" />
                    </form>
                </div>

                {/* 오른쪽 영역 */}
                <div className="flex-1 flex flex-col relative">
                    {/* 중앙 이미지 */}
                    <div className="flex flex-1">
                        <img src={formImage} alt="Form Image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
