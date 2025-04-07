import Sidebar from "../../components/chatting/Sidebar";

const ChattingSubjectSelectionPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center bg-[#FAFAFB] px-4">
        <div className="text-center w-full max-w-[1000px] h-[600px] p-10 bg-white rounded-2xl shadow-sm flex flex-col justify-center items-center">
          {/* 상단 텍스트 */}
          <h3 className="text-[#A476CC] text-xl font-semibold mb-4">새 채팅 시작</h3>
          <h2 className="text-2xl font-bold mb-6">
            주제를 선택하고 더 정확한 답변을 받아보세요!
          </h2>
          <p className="text-[#4E4E4E] leading-relaxed mb-6">
            궁금한 내용을 더 빠르고 정확하게 해결할 수 있도록, 먼저 주제를 선택해주세요. <br />
            원하는 주제를 선택하면 맞춤형 답변을 제공해 드립니다!
          </p>

          {/* 주제 버튼들 */}
          <div className="flex flex-wrap justify-center gap-3 max-w-[600px]">
            {Array(7).fill("주제 1").map((subject, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full border 
                  ${index === 2 
                    ? "bg-[#A476CC] text-white border-[#A476CC]" 
                    : "text-[#4E4E4E] border-[#DADADA]"}
                `}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingSubjectSelectionPage;
