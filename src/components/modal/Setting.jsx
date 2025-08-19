// 사이드바에서 설정 버튼을 클릭했을 때 나타나는 모달창 컴포넌트

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../REDUX/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../../REDUX/theme/themeSlice";
import axios from "../../api/axiosInstance";
import XIcon from "../../assets/XIcon.png";

const Setting = ( {onClose} ) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [settings, setSettings] = useState({ // 상태 관리
        theme: "",
        language: "",
        memory: "",
    })
    const [availableLanguage, setAvailableLanguage] = useState([]);
    const languageMap = { // 언어 목록
        ko: "한국어",
        en: "영어",
        ja: "일본어",
        zh: "중국어",
        fr: "프랑스어",
        de: "독일어",
        vi: "베트남어",
        ru: "러시아어",
    }

    // 언어 불러오기
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get("/api/v1/language/");
                setAvailableLanguage([
                    { lang_code: "auto", language_name: "자동탐지", lang_id: 1 },
                    ...response.data.map(lang => ({
                        lang_code: lang.lang_code,
                        language_name: languageMap[lang.lang_code] || lang.lang_code,
                        lang_id: lang.lang_id
                    }))
                ]);
            } catch (err) {
                console.error("언어 불러오기 실패", err);
            }
        };
        fetchLanguages();
    }, []);
    // 옵션 불러오기
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get("/api/v1/settings/");
                const { thema, memory, language } = response.data;
                setSettings((prev) => ({
                    ...prev,
                    theme: thema ? "화이트" : "다크",
                    memory: memory ? "켜짐" : "꺼짐",
                    language: availableLanguage.find(lang => lang.lang_id === language)?.language_name || "자동탐지", 
                }));
            } catch(err) {
                console.error(err);
            }
        };
        fetchOptions();
    }, [token, availableLanguage]);
    // 옵션 선택
    const handleOptionClick = (category, value) => {
        setSettings((prev) => ({
            ...prev,
            [category]: value,
        }));
    };
    // 모든 채팅 삭제
    const handleDeleteAllChatSession =  async () => {
        try {
            await axios.delete("/api/v1/sessions/user/all");
            onClose();
            navigate("/topics");
        } catch (err) {
            console.error(err);
        }
    }   
    // 설정 저장
    const handleSaveSetting = async () => {
        const dataToSave = {
            thema: settings.theme === "화이트" ? true : false,
            memory: settings.memory === "켜짐" ? true : false,
            language: availableLanguage.find(lang => lang.language_name === settings.language)?.lang_id || 1, // 선택된 언어의 lang_id 찾기
        };
        try {
            await axios.put("/api/v1/settings/", dataToSave);
            // 테마 설정 (Redux 상태 업데이트)
            if(settings.theme === "화이트") {
                dispatch(setTheme("light"));
            } else {
                dispatch(setTheme("dark"));
            }
            onClose();
        } catch (err) {
            console.error("설정 저장 실패!", err);
        }
    }
    // 로그아웃
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    // 회원 탈퇴
    const handleDeleteAccount = () => {
        console.log("회원 탈퇴");
    };
    // 모달창 닫기
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm backdrop-brightness-75 flex items-center justify-center" onClick={handleOverlayClick}>
            <div className="bg-white dark:bg-[#232129] w-100 md:w-[500px] h-[500px] rounded-2xl p-6 relative flex flex-col">
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
                    <img src={XIcon} />
                </button>
                {/* 제목 */}
                <h2 className="dark:text-white text-2xl font-semibold my-10 text-center">설정</h2>
                {/* 설정 박스 */}
                <div className="border border-[#DADADA] rounded-xl px-6 py-4 space-y-6 text-sm">
                    {[
                        { label: "테마", options: ["화이트", "다크"], key: "theme" },
                        { label: "언어", options: availableLanguage.map(lang => lang.language_name), key: "language" },
                        { label: "메모리", options: ["켜짐", "꺼짐"], key: "memory" },
                    ].map(({ label, options, key }, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                            {/* 왼쪽 라벨 */}
                            <div className="w-12 dark:text-white font-medium">{label}</div>
                            {/* 세로 구분선 */}
                            <div className="border-l border-[#DADADA] h-5" />
                            {/* 오른쪽 옵션들 */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#999999] pl-4">
                                {options.map((opt, i) => (
                                <span 
                                    key={i} 
                                    onClick={() => handleOptionClick(key, opt)} 
                                    className={`cursor-pointer ${settings[key] === opt ? "text-[#1A1A1A] dark:text-white font-semibold" : ""}`}
                                >
                                    {opt}
                                </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* 모든 채팅 삭제 */}
                    <div className="text-right text-sm text-[#999999] cursor-pointer hover:text-black dark:hover:text-white transition">
                        <button className="cursor-pointer" onClick={handleDeleteAllChatSession}>모든 채팅 삭제</button>
                    </div>
                </div>
                {/* 설정 저장하기 */}
                <button className="bg-[#A476CC] hover:bg-[#6A4B85] dark:hover:bg-[#C0A3E6] transition text-white text-sm py-3 rounded-xl mt-6 cursor-pointer" onClick={handleSaveSetting}>
                    설정 저장하기
                </button>
                {/* 로그아웃, 회원 탈퇴 */}
                <div className="flex justify-center gap-6 text-[#999999] text-sm mt-4">
                    <button className="hover:text-black dark:hover:text-white transition cursor-pointer" onClick={handleLogout}>로그아웃</button>
                    <button className="hover:text-black dark:hover:text-white transition cursor-pointer" onClick={handleDeleteAccount}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
};

export default Setting;