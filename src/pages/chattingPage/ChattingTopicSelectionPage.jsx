import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axiosInstance";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";

const ChattingTopicSelectionPage = () => {
  const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);
  const sidebarWidth = isChatListVisible ? 500 : 80;
  const token = useSelector((state) => state.auth.token);

  // 주제 선택 (임시 데이터)
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);


  // 주제를 선택하여 새로운 대화 세션 생성
  const handleClick = async (topic) => {
    setSelectedTopicId(topic.topic_id);
    console.log("선택한 주제", topic);

    try {
      const response = await axios.post("/api/v1/sessions/", 
        { topic_id: topic.topic_id }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("세션 생성 성공", response.data);
      const newSessionId = response.data.session_id;
      console.log("생성된 세션 ID", newSessionId);
      // 여기서 세션 ID로 추가 작업 수행 가능 (예: 페이지 리디렉션)
    } catch (err) {
      console.error("대화 세션 생성 실패: ", err);
    }
  };

  // 주제 목록 불러오기
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("/api/v1/topics/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("주제 요청 성공", response.data);
        setTopics(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopics();  
  }, [token]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatHeader />
      <div
        className="transition-all duration-300"
        style={{ width: `calc(100% - ${sidebarWidth}px)` }}
      >
        <div className="flex justify-center items-center bg-[#FAFAFA] px-4 h-full">
          <div className="text-center w-full max-w-[1400px] h-[600px] p-10 bg-white rounded-2xl shadow-sm flex flex-col justify-center items-center">
            {/* 상단 텍스트 */}
            <h3 className="text-[#A476CC] text-xl font-semibold mb-4">새 채팅 시작</h3>
            <h2 className="text-[#1A1A1A] text-2xl font-bold mb-6">
              주제를 선택하고 더 정확한 답변을 받아보세요!
            </h2>
            <p className="text-[#4E4E4E] leading-relaxed mb-6">
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
                        : "text-[#4E4E4E] border-[#DADADA] hover:bg-[#DADADA]"
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
