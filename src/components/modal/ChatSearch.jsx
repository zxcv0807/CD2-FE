import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import SearchIconGray from "../../assets/SearchIconGray.png";
import XIcon from "../../assets/XIcon.png";

const ChatSearch = ( {onClose} ) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post("/api/v1/faiss/search/keyword/sessions", 
                { keyword: search },
            );
            console.log("검색 결과", response.data);
            setSearchResults(response.data);
        } catch (err) {
            console.error(err);
            setSearchResults([]);
        }
    };
    // 대화 세션 클릭
    const handleSessionClick = (session_id) => {
        console.log(`${session_id}번째 대화 세션 선택`);
        onClose();
        navigate(`/chatting/${session_id}`)
    }
    // 새 채팅 시작하기
    const handleNewChatStart = () => {
        onClose();
        navigate("/topics");
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
                <h2 className="text-2xl dark:text-white font-semibold my-10 text-center">채팅 검색</h2>
                {/* 검색창 */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="검색어를 입력해 주세요."
                        className="w-full dark:text-white border-b border-[#DADADA] px-4 py-2 pr-10 focus:outline-none focus:border-[#DADADA]"
                    />
                    <img
                        src={SearchIconGray}
                        alt="search"
                        className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={handleSearch}
                    />
                </div>
                {/* 검색 결과 */}
                <div className="flex flex-col gap-3 overflow-auto">
                    {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                            <div key={item.session_id} className="bg-[#F5F5F5] dark:bg-[#393646] p-3 mr-1 rounded-lg cursor-pointer hover:bg-[#eaeaea] dark:hover:bg-[#4E4E4E]" onClick={()=>handleSessionClick(item.session_id)}>
                                <div className="dark:text-white font-semibold truncate">{item.title}</div>
                                <div className="dark:text-[#BBBBBB] text-sm text-[#4E4E4E]">{item.topics[0]}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-[#999999] dark:text-[#BBBBBB]">검색 결과가 없습니다.</div>
                    )}
                </div>
                {/* 새 채팅 시작하기 */}
                <button className="mt-auto pt-4 text-center text-sm text-[#999999] cursor-pointer" onClick={handleNewChatStart}>
                    새 채팅 시작하기
                </button>
            </div>
        </div>
    );
};

export default ChatSearch