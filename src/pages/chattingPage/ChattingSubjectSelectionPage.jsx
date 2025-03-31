import Sidebar from "../../components/chatting/Sidebar";

const ChattingSubjectSelectionPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50">
        <h3 className="text-lg text-[#A476CC] font-semibold">새 채팅 시작</h3>
        <h2 className="text-2xl font-bold my-2">
          주제를 선택하고 더 정확한 답변을 받아보세요!
        </h2>
        <p className="text-gray-500 text-center px-6 max-w-lg">
          궁금한 내용을 더 빠르고 정확하게 해결할 수 있도록, 먼저 주제를 선택하세요. 
          원하는 주제를 선택하면 맞춤형 답변을 제공해 드립니다!
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {Array(5).fill("주제 1").map((subject, index) => (
            <button key={index} className="px-4 py-2 border rounded-full">
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChattingSubjectSelectionPage;
