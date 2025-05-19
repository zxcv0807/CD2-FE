import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";

const ChatBubble = ({ id, type, text, isCOT = false, isAiAccepting = false, session_id }) => {
  const token = useSelector((state) => state.auth.token);
  const [thumbsSubmitted, setThumbsSubmitted] = useState(false);

  // ai 채팅
  const handleThumbsUpDown = async (recommend) => {
    try {
      await axios.post(import.meta.env.VITE_API_AI_URL + `/feedback/${session_id}`,
        {
          token: token,
          message_id: id,
          recommend: recommend,
        } 
      );
      console.log(`${id}번쨰 채팅 추천/비추천`);
      setThumbsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (type === "ai") {
    if (isCOT) {
      return (
        <div className="flex flex-col items-start w-full">
          <div className="w-full text-sm italic bg-yellow-50 rounded-xl px-4 py-2 animate-pulse">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      );
    };
    
    if (text.trim().length > 0 || isAiAccepting) {
      return (
        <div className="flex flex-col items-start w-full my-6">
          {/* 텍스트 내용 */}
          <div className="w-full ai-markdown">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>

          {!isAiAccepting && !thumbsSubmitted && text.trim().length > 0 && (
            <>
              {/* 구분선 */}
              <div className="w-full h-px bg-[#DADADA] my-3"></div>

              {/* 답변에 대한 피드백 */}
              <div className="w-full flex justify-end items-center gap-2">
                <span className="text-sm text-[#999999]">해당 내용의 적절한 답변이 어땠나요?</span>
                {/* 좋아요, 싫어요 아이콘 */}
                <img src={ThumbsUp} className="cursor-pointer" onClick={() => handleThumbsUpDown(true)}/>
                <img src={ThumbsDown} className="cursor-pointer" onClick={() => handleThumbsUpDown(false)}/>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  }

  // 사용자와, 피드백 채팅
  const isFeedback = type === "feedback";
  return (
    <div className={`flex ${isFeedback ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap
          ${isFeedback ? "bg-[#A476CC] text-white" : "bg-[#E7E7E7] dark:bg-[#4E4E4E] text-[#1A1A1A] dark:text-white"}`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;