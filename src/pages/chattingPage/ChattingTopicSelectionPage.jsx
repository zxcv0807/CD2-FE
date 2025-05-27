import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axiosInstance";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";
import { useNavigate } from "react-router-dom";

const ChattingTopicSelectionPage = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const token = useSelector((state) => state.auth.token); 

  // 주제 선택
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 토큰 여부로 로그인 확인
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // 주제를 선택하여 새로운 대화 세션 생성
  const handleClick = async (topic) => {
    setSelectedTopicId(topic.topic_id);

    // 비로그인
    if (!isLoggedIn) {
      navigate(`/chatting/topics/${topic.topic_name}`);
      return;
    }

    // 로그인
    try {
      const response = await axios.post("/api/v1/sessions/", 
        { topic_id: topic.topic_id }, 
      );
      const newSessionId = response.data.session_id;
      navigate(`/chatting/${newSessionId}`)
    } catch (err) {
      console.error("대화 세션 생성 실패: ", err);
    }
  };

  // 주제 목록 불러오기
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("/api/v1/topics/");
        setTopics(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopics();  
  }, [token]);

  // 사이드바 토글 함수
  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <ChatHeader onToggleSidebar={handleToggleSidebar} />
      <div
        className="transition-all duration-300 mt-16 md:mt-0 w-full md:w-auto"
        style={{ width: `100%`, marginLeft: 0, flexGrow: 1, marginRight: 0 }}
      >
        <div className="flex justify-center items-center bg-[#FAFAFA] dark:bg-[#18171C] px-4 h-full">
          <div className="text-center w-full max-w-[1400px] h-[80%] p-10 bg-white dark:bg-[#232129] rounded-2xl shadow-sm flex flex-col justify-center items-center">
            {/* 상단 텍스트 */}
            <h2 className="text-[#A476CC] text-xl font-semibold mb-4">새 채팅 시작</h2>
            <h3 className="text-[#1A1A1A] dark:text-white text-2xl font-bold mb-6">
              주제를 선택하고 더 정확한 답변을 받아보세요!
            </h3>
            <p className="text-[#4E4E4E] dark:text-[#BBBBBB] leading-relaxed mb-6">
              궁금한 내용을 더 빠르고 정확하게 해결할 수 있도록, 먼저 주제를 선택해주세요. <br />
              원하는 주제를 선택하면 맞춤형 답변을 제공해 드립니다!
            </p>

            {/* 주제 버튼들 */}
            <div className="flex flex-wrap justify-center gap-3 max-w-[600px]">
              {topics.map((topic) => (
                <button
                  key={topic.topic_id}
                  onClick={() => handleClick(topic)}
                  className={`px-6 py-2 rounded-full border transition
                    ${
                      selectedTopicId === topic.topic_id
                        ? "bg-[#A476CC] text-white border-[#A476CC]"
                        : "text-[#4E4E4E] dark:text-[#FAFAFA] border-[#DADADA] dark:border-[#888888] hover:bg-[#DADADA] dark:hover:bg-[#888888]"
                    }
                  `}
                >
                  {topic.topic_name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingTopicSelectionPage;
