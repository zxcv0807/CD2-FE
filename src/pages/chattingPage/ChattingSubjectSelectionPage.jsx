import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";

const subjects = ["주제 1", "주제 2", "주제 3", "주제 4", "주제 5", "주제 6", "주제 7"];

const ChattingSubjectSelectionPage = () => {
  const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);
  const sidebarWidth = isChatListVisible ? 500 : 80;

  // 주제 선택
  const [selectedSubject, setSelectedSubject] = useState(null);
  const handleClick = (subject) => {
    setSelectedSubject(subject);
    console.log("선택한 주제", subject);
  }

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
              {subjects.map((subject, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(subject)}
                  className={`px-6 py-2 rounded-full border transition
                    ${
                      selectedSubject === subject
                        ? "bg-[#A476CC] text-white border-[#A476CC]"
                        : "text-[#4E4E4E] border-[#DADADA] hover:bg-[#DADADA]"
                    }
                  `}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingSubjectSelectionPage;
