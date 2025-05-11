import { useEffect, useRef, useState } from "react";
import ChatInputTooltip from "../modal/ChatInputToolTip";
import SpeechBubbleIcon from "../../assets/SpeechBubble.png";
import WebSearchIcon from "../../assets/WebSearchIcon.png";
import WebSearchIconPurple from "../../assets/WebSearchIconPurple.png";
import ClipIcon from "../../assets/ClipIcon.png";
import RightArrowWhiteIcon from "../../assets/RightArrowWhiteIcon.png";

// 파일 크기 제한
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const [isOptimized, setIsOptimized] = useState(false);
  const toggleOptimization = () => setIsOptimized(prev => !prev);

  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const toggleWebSearch = () => setIsWebSearchActive(prev => !prev);

  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // 채팅창 높이 제한
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  // 파일 선택 트리거
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  // 파일 업로드
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "text/csv", "text/plain"];

    let totalSize = attachedFiles.reduce((acc, file) => acc + file.size, 0);
    const filteredFiles = [];

    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`파일당 최대 5MB까지 업로드 가능합니다.`);
        continue;
      }

      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        alert("전체 첨부파일은 총 20MB를 넘을 수 없습니다.");
        break;
      }

      totalSize += file.size;
      filteredFiles.push(file);
    }

    setAttachedFiles(prev => [...prev, ...filteredFiles]);
    e.target.value = null; // 재업로드를 가능하게 함
  };
  // 파일 제거
  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // 메시지 전송
  const handleSend = () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    console.log("전송 메시지:", message);
    console.log("최적화 상태", isOptimized);
    console.log("웹 서치 상태", isWebSearchActive);
    console.log("첨부 파일: ", attachedFiles);

    onSendMessage(message, attachedFiles);
    setMessage("");
    setAttachedFiles([]);
  };

  return (
    <div className="w-full max-w-[700px] flex flex-col">
      <div className="w-full bg-white dark:bg-[#2E2C36] border border-[#4E4E4E] rounded-2xl px-4 py-2">
        {/* 첨부파일 미리보기 */}
        {attachedFiles.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-3">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg shadow-sm">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="첨부 이미지"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="p-2 bg-white border rounded text-sm">
                    {file.name}
                  </div>
                )}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-sm text-red-500 hover:underline cursor-pointer"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 입력창 */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="무엇이든 물어보세요"
          rows={1}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          className="w-full dark:text-white resize-none overflow-y-auto max-h-[200px] text-sm bg-transparent focus:outline-none"
        />

        <div className="flex justify-between items-center mt-2">
          {/* 최적화하기 버튼 */}
          <button
            className="flex gap-2 px-4 py-2 rounded-lg cursor-pointer"
            style={{ backgroundColor: isOptimized ? "#C3C3C3" : "#A476CC" }}
            onClick={toggleOptimization}
          >
            <img src={SpeechBubbleIcon} className="h-[18px]" />
            <span className="text-white text-sm">최적화하기</span>
          </button>

          <div className="flex items-center space-x-3">
            {/* 웹서치 아이콘 */}
            <ChatInputTooltip text="웹 검색">
              <img
                src={isWebSearchActive ? WebSearchIconPurple : WebSearchIcon}
                onClick={toggleWebSearch}
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </ChatInputTooltip>

            {/* 첨부파일 업로드 아이콘 */}
            <ChatInputTooltip text="파일 첨부">
              <div className="relative cursor-pointer" onClick={triggerFileSelect}>
                <img src={ClipIcon} />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.csv,.txt"
                  className="hidden"
                />
              </div>
            </ChatInputTooltip>

            {/* 전송 버튼 */}
            <ChatInputTooltip text="메시지 전송">
              <button onClick={handleSend}>
                <img src={RightArrowWhiteIcon} className="cursor-pointer" />
              </button>
            </ChatInputTooltip>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#4E4E4E] dark:text-[#BBBBBB]">
          우문현답은 실수할 수 있습니다.
      </p>
    </div>
  );
};

export default ChatInput;