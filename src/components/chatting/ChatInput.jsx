// 채팅 입력 컴포넌트

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Tooltip from "../modal/Tooltip";
import ModelListModal from "../modal/ModelListModal";
import WebSearchIcon from "../../assets/WebSearchIcon.png";
import WebSearchIconPurple from "../../assets/WebSearchIconPurple.png";
import ClipIcon from "../../assets/ClipIcon.png";
import RightArrowWhiteIcon from "../../assets/RightArrowWhiteIcon.png";
import ModelMenuIcon from "../../assets/ModelMenuIcon.png";
import ReportIcon from "../../assets/reportIcon.png";

// 파일 크기 제한 (백엔드와 동일하게 설정)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

const ChatInput = forwardRef (({ onSendMessage, isReportTyping, isHitlActive }, ref) => {
  const [message, setMessage] = useState(""); // 입력 메시지 상태
  const textareaRef = useRef(null); // 입력창 참조
  const fileInputRef = useRef(null); // 파일 입력 참조
  const timerRef = useRef(null); // 타이머 참조
  const [isReportActive, setIsReportActive] = useState(false); // 보고서 생성 활성화 상태
  const [isWebSearchActive, setIsWebSearchActive] = useState(false); // 웹 서치 활성화 상태
  const [attachedFiles, setAttachedFiles] = useState([]); // 첨부파일 상태
  const [sendErrorMessage, setSendErrorMessage] = useState(null); // 전송 오류 메시지 상태
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false); // 모델 선택 메뉴 열림 상태
  const [currentModelId, setCurrentModelId] = useState(0); // 현재 선택된 모델 ID

  const toggleOptimization = () => setIsReportActive(prev => !prev); // 최적화하기 ON/OFF
  const toggleWebSearch = () => setIsWebSearchActive(prev => !prev); //웹 서치 ON/OFF
  const toggleModelMenu = () => setIsModelMenuOpen(prev => !prev); // 모델 리스트 열기

  // 채팅창 높이 제한
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);
  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
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
        alert("전체 첨부파일은 총 10MB를 넘을 수 없습니다.");
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
  
  // 에러 메시지 타이머 초기화
  const clearSendErrorTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }
  // ai로부터 답변을 받는 중일 때 메시지 전송 시도
  useImperativeHandle(ref, () => ({
    handleAttemptSend: (isTyping, isHitlActive) => {
      if (isTyping && !isHitlActive) {
        setSendErrorMessage("AI 응답 중입니다. 잠시만 기다려주세요.");
        clearSendErrorTimer();
        timerRef.current = setTimeout(() => setSendErrorMessage(null), 3000);
      } else {
        setSendErrorMessage(null);
        clearSendErrorTimer();
      }
    },
  }));
  // 메시지 전송
  const handleSend = () => {
    if (isReportTyping && !isHitlActive) {
      setSendErrorMessage("AI 응답 중입니다. 잠시만 기다려주세요.");
      clearSendErrorTimer();
      timerRef.current = setTimeout(() => setSendErrorMessage(null), 3000);
      return; 
    }

    if (!message.trim() && attachedFiles.length === 0) return;

    onSendMessage(message, attachedFiles, isWebSearchActive, isReportActive, currentModelId);
    setMessage("");
    setAttachedFiles([]);
  };

  return (
    <div className="w-full max-w-[700px] flex flex-col">
      {sendErrorMessage && (
        <p className="mb-2 text-center text-xs text-[#ED4545]">
            {sendErrorMessage}
        </p>
      )}
      <div className="w-full bg-white dark:bg-[#2E2C36] border border-[#DADADA] shadow rounded-2xl px-4 py-2">
        {/* 첨부파일 미리보기 */}
        {attachedFiles.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-3">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg shadow-sm">
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
          {/* 보고서 생성 버튼 */}
          <button
            className="flex gap-2 px-4 py-2 rounded-lg cursor-pointer"
            style={{ backgroundColor: isReportActive ? "#A476CC" : "#C3C3C3" }}
            onClick={toggleOptimization}
          >
            <img src={ReportIcon} />
            <span className="text-white">보고서 생성</span>
          </button>

          <div className="flex items-center space-x-3 relative">
            {/* 모델 선택 아이콘 */}
            <Tooltip text="모델 선택" position="top">
              <img
                src={ModelMenuIcon}
                onClick={toggleModelMenu}
                className="cursor-pointer"
              />
            </Tooltip>
            {isModelMenuOpen && (
              <div className="absolute right-24 bottom-full mb-2">
                <ModelListModal
                  isOpen={isModelMenuOpen}
                  onModelSelect={(modelId) => {
                    setCurrentModelId(modelId);
                    setIsModelMenuOpen(false);
                  }}
                  currentModelId={currentModelId}
                />
              </div>
            )}
            {/* 웹서치 아이콘 */}
            <Tooltip text="웹 검색" position="top">
              <img
                src={isWebSearchActive ? WebSearchIconPurple : WebSearchIcon}
                onClick={toggleWebSearch}
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </Tooltip>

            {/* 첨부파일 업로드 아이콘 */}
            <Tooltip text="파일 첨부" position="top">
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
            </Tooltip>

            {/* 전송 버튼 */}
            <Tooltip text="메시지 전송" position="top">
              <button onClick={handleSend}>
                <img src={RightArrowWhiteIcon} className="cursor-pointer" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#4E4E4E] dark:text-[#BBBBBB]">
          우문현답은 실수할 수 있습니다.
      </p>
    </div>
  );
});

export default ChatInput;