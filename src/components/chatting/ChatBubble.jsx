import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import FeedbackUI from "./FeedbackUI";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

const ChatBubble = ({ type, text, isTyping = false, session_id, message_id, isCompleted = false, recommendation_status }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  // 피드백 UI 보여주기
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
  // optimize 타입
  if (type === "optimize") {
    const optimizeId = `optimize-${message_id}`;
    return (
      <div className="flex justify-start mb-4">
        <div className="w-full">
          <div className="max-w-[80%]">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-[#1A1A1A] dark:text-white uppercase tracking-wide">
                  최적화된 프롬프트
                </span>
              </div>
              
              {/* 복사 버튼 */}
              <button
                onClick={() => copyToClipboard(text, optimizeId)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 
                           hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                           rounded transition-colors duration-200"
              >
                {isCopied(optimizeId) ? (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>복사</span>
                  </>
                )}
              </button>
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
          {shouldShowFeedback() && <FeedbackUI session_id={session_id} message_id={message_id} messageText={text} recommendation_status={recommendation_status}/>}
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
                  const codeString = String(children).replace(/\n$/, '');
                  // 고유한 코드 블록 ID 생성 (메시지ID + 코드 내용 해시)
                  const codeId = `${message_id}-${Math.random().toString(36).substr(2, 9)}`;
                  
                  return !inline && match ? (
                    <div className="relative my-4">
                      {/* 코드 블록 헤더 - 언어명과 복사 버튼 */}
                      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d30] text-xs text-gray-300 rounded-t-md border-b border-[#3e3e42]">
                        <span className="font-mono">{match[1]}</span>
                        <button
                          onClick={() => copyToClipboard(codeString, codeId)}
                          className="flex items-center gap-1 px-2 py-1 hover:bg-[#404040] rounded transition-colors duration-200"
                        >
                          {isCopied(codeId) ? (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>복사됨</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>복사</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* 실제 코드 블록 */}
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ 
                          margin: 0, 
                          borderTopLeftRadius: 0, 
                          borderTopRightRadius: 0,
                          borderBottomLeftRadius: '0.375rem',
                          borderBottomRightRadius: '0.375rem'
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                      

                    </div>
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

          {shouldShowFeedback() && <FeedbackUI session_id={session_id} message_id={message_id} messageText={text} recommendation_status={recommendation_status}/>}
        </div>
      );
    }
    return null;
  }
  // 알 수 없는 타입인 경우
  return null;
};

export default ChatBubble;