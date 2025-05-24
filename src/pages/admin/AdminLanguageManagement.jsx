import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import axios from "../../api/axiosInstance";

const AdminLanguageManagement = () => {
    const token = useSelector((state) => state.auth.token);
    const [languages, setLanguages] = useState([]);
    const [newLanguage, setNewLanguage] = useState("");
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

    // 언어 목록 불러오기
    useEffect(() => {
        const fetchLanguages = async () => {
        try {
            const response = await axios.get("/api/v1/language/");
            console.log("언어 목록 불러오기 성공", response.data);
            setLanguages(response.data);
        } catch (err) {
            console.error("언어 불러오기 실패", err);
        }
        };
        fetchLanguages();
    }, []);

    // 언어 추가
    const handleAddLanguage = async () => {
        if (newLanguage.trim() && !languages.some(l => l.language_name === newLanguage)) {
            try {
                const response = await axios.post("/api/v1/admin/languages",
                    { lang_code: newLanguage },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    },  
                );
                console.log("언어 추가 성공", response.data);
                setLanguages([...languages, response.data]);
                setNewLanguage("");
            } catch (err) {
                console.error("언어 추가 실패", err);
            }
        }
    };

    // 언어 삭제
    const handleDeleteLanguage = async (language_id) => {
        try {
            await axios.delete(`/api/v1/admin/languages/${language_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("언어 삭제 성공");
            setLanguages(languages.filter((lang) => lang.lang_id !== language_id));
        } catch (err) {
            console.error("언어 삭제 실패", err);
        }
    };

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
        <AdminSidebar />
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">언어 관리</h2>

            {/* 언어 추가 섹션 */}
            <div className="flex gap-2 mb-6">
            <input
                type="text"
                placeholder="새 언어를 입력하세요"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded shadow-sm"
            />
            <button
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                추가
            </button>
            </div>

            {/* 언어 목록 */}
            <ul className="space-y-2">
            {languages.map((lang) => (
                <li
                    key={lang.lang_id}
                    className="flex justify-between items-center p-4 bg-white rounded shadow"
                >
                <span>{languageMap[lang.lang_code] || lang.lang_code}</span>
                <button
                    onClick={() => handleDeleteLanguage(lang.lang_id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >   
                    삭제
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
};

export default AdminLanguageManagement;
