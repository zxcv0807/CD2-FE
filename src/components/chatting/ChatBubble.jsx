import ReactMarkdown from "react-markdown";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";

const ChatBubble = ({ id, type, text }) => {
  // ai 채팅
  const handleThumbsUp = () => {
    console.log(`좋아요 ${id}번째 채팅`);
  };
  const handleThumbsDown = () => {
    console.log(`싫어요 ${id}번째 채팅`);
  }
  if (type === "ai") {
    return (
      <div className="flex flex-col items-start w-full my-6">
        {/* 텍스트 내용 */}
        <div className="w-full ai-markdown">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-[#DADADA] my-3"></div>

        {/* 답변에 대한 피드백 */}
        <div className="w-full flex justify-end items-center gap-2">
          <span className="text-sm text-[#999999]">해당 내용의 적절한 답변이 어땠나요?</span>
          {/* 좋아요, 싫어요 아이콘 */}
          <img src={ThumbsUp} className="cursor-pointer" onClick={handleThumbsUp}/>
          <img src={ThumbsDown} className="cursor-pointer" onClick={handleThumbsDown}/>
        </div>
      </div>
    );
  }

  // 사용자와, 피드백 채팅
  const isFeedback = type === "feedback";
  return (
    <div className={`flex ${isFeedback ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap
          ${isFeedback ? "bg-[#A476CC] text-white" : "bg-[#F5F5F5] text-[#1A1A1A]"}`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
