import { useDispatch } from "react-redux";
import { logout } from "../../REDUX/auth/authSlice";
import { useNavigate } from "react-router-dom";
import XIcon from "../../assets/XIcon.png";
import { useState } from "react";

const Setting = ( {onClose} ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 상태 관리
    const [settings, setSettings] = useState({
        theme: "화이트",
        language: "자동탐지",
        memory: "켜짐",
    })
    const handleOptionClick = (category, value) => {
        setSettings((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    // 모든 채팅 삭제
    const handleDeleteAllChatSession = () => {
        console.log("모든 대화 내용 삭제");
    }
    // 설정 저장
    const handleSaveSetting = () => {
        console.log("설정 저장하기", settings);
    }
    // 로그아웃
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    // 회원 탈퇴
    const handleDeleteAccount = () => {
        console.log("회원 탈퇴");
    }
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm backdrop-brightness-75 flex items-center justify-center">
            <div className="bg-white w-[500px] h-[500px] rounded-2xl p-6 relative flex flex-col">
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
                    <img src={XIcon} />
                </button>
                {/* 제목 */}
                <h2 className="text-2xl font-semibold my-10 text-center">설정</h2>
                {/* 설정 박스 */}
                <div className="border border-[#DADADA] rounded-xl px-6 py-4 space-y-6 text-sm">
                    {[
                        { label: "테마", options: ["화이트", "다크"], key: "theme" },
                        { label: "언어", options: ["자동탐지", "한국어", "영어", "일본어", "중국어"], key: "language" },
                        { label: "메모리", options: ["켜짐", "꺼짐"], key: "memory" },
                    ].map(({ label, options, key }, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                            {/* 왼쪽 라벨 */}
                            <div className="w-12 font-medium">{label}</div>
                            {/* 세로 구분선 */}
                            <div className="border-l border-[#DADADA] h-5" />
                            {/* 오른쪽 옵션들 */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#999999] pl-4">
                                {options.map((opt, i) => (
                                <span 
                                    key={i} 
                                    onClick={() => handleOptionClick(key, opt)} 
                                    className={`cursor-pointer ${settings[key] === opt ? "text-[#1A1A1A] font-semibold" : ""}`}
                                >
                                    {opt}
                                </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* 모든 채팅 삭제 */}
                    <div className="text-right text-sm text-[#999999] cursor-pointer hover:text-black transition">
                        <button className="cursor-pointer" onClick={handleDeleteAllChatSession}>모든 채팅 삭제</button>
                    </div>
                </div>
                {/* 설정 저장하기 */}
                <button className="bg-[#A476CC] hover:bg-[#8e68ce] transition text-white text-sm py-3 rounded-xl mt-6 cursor-pointer" onClick={handleSaveSetting}>
                    설정 저장하기
                </button>
                {/* 로그아웃, 회원 탈퇴 */}
                <div className="flex justify-center gap-6 text-[#999999] text-sm mt-4">
                    <button className="hover:text-black transition cursor-pointer" onClick={handleLogout}>로그아웃</button>
                    <button className="hover:text-black transition cursor-pointer" onClick={handleDeleteAccount}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
};

export default Setting;