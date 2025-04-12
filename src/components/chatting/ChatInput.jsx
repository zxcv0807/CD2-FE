import { useEffect, useRef, useState } from "react";
import SpeechBubbleIcon from "../../assets/SpeechBubble.png";
import WebSearchIcon from "../../assets/WebSearchIcon.png";
import ClipIcon from "../../assets/ClipIcon.png";
import RightArrowWhiteIcon from "../../assets/RightArrowWhiteIcon.png";


const ChatInput = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message])

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("전송 메시지:", message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-[800px] bg-white border border-[#1A1A1A] rounded-2xl px-4 py-2 shadow-sm">
      {/* 입력창 */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="무엇이든 물어보세요"
        rows={1}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
        className="w-full resize-none overflow-y-auto max-h-[200px] text-sm bg-transparent focus:outline-none"
      />
      <div className="flex justify-between items-center mt-2">
        {/* 최적화하기 버튼튼 */}
        <button className="flex gap-2 bg-[#A476CC] px-4 py-2 rounded-lg">
          <img src={SpeechBubbleIcon} className="h-[18px]" />
          <span className="text-white text-sm">최적화하기</span>
        </button>
        {/* 채팅 오른쪽 아이콘들들 */}
        <div className="flex items-center space-x-3">
          <img src={WebSearchIcon} />
          <img src={ClipIcon} />
          <button onClick={handleSend}>
            <img src={RightArrowWhiteIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
