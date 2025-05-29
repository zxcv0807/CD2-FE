import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import FeedbackUI from "./FeedbackUI";

const ChatBubble = ({ type, text, isTyping = false, session_id, message_id, isCompleted = false }) => {
  const token = useSelector((state) => state.auth.token);
  const [thumbsSubmitted, setThumbsSubmitted] = useState(false);

  const shouldShowFeedback = () => {
    return !isTyping && 
          text.trim().length > 0 && 
          isCompleted; 
  };

  // user 타입 
  if (type === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap bg-[#E7E7E7] dark:bg-[#4E4E4E] text-[#1A1A1A] dark:text-white">
          {text}
        </div>
      </div>
    );
  };
  // hitl_ai 타입
  if (type === "hitl_ai") {
    return (
      <div className="flex justify-start mb-4">
        <div className="px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap bg-[#A476CC] text-white">
          {text}
        </div>
      </div>
    );
  }
  // hitl_user 타입
  if (type === "hitl_user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap bg-[#E7E7E7] dark:bg-[#4E4E4E] text-[#1A1A1A] dark:text-white">
          {text}
        </div>
      </div>
    );
  }
  // optimize 타입 - 기존 optimize UI 그대로
  if (type === "optimize") {
    return (
      <div className="flex justify-start mb-4">
        <div className="w-full">
          <div className="max-w-[80%]">
            {/* 헤더 */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs font-medium text-[#1A1A1A] dark:text-white uppercase tracking-wide">
                최적화된 프롬프트
              </span>
            </div>
            
            {/* 메시지 내용 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                            rounded-r-xl rounded-tl-xl px-4 py-3 
                            shadow-sm relative overflow-hidden">
              {/* 텍스트 */}
              <div className="relative text-sm text-[#1A1A1A] dark:text-white leading-relaxed whitespace-pre-wrap">
                {text}
              </div>
            </div>
          </div>
          {/* 피드백 UI */}
          {shouldShowFeedback() && <FeedbackUI session_id={session_id} message_id={message_id} />}
        </div>
      </div>
    );
  }
  // report 타입 
  if (type === "report") {
    if (text.trim().length === 0 && isTyping) {
      return null;
    }
    
    if (text.trim().length > 0 || isTyping) {
      return (
        <div className="flex flex-col items-start w-full my-4">
          {/* 텍스트 내용 */}
          <div className="w-full ai-markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {text}
            </ReactMarkdown>
            {isTyping && <span className="typing-cursor">|</span>}
          </div>

          {shouldShowFeedback() && <FeedbackUI session_id={session_id} message_id={message_id} />}
        </div>
      );
    }
    return null;
  }
  // 알 수 없는 타입인 경우
  return null;
};

export default ChatBubble;