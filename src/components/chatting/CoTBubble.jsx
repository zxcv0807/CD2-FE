import { useState } from "react";

const CoTBubble = ({ currentText, isLoading, history }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex items-start w-full mb-4">
      {isLoading && (
        <div className="flex justify-center items-center mr-3">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#A476CC]"></div>
        </div>
      )}
      <div className="w-full text-sm italic bg-yellow-50 dark:bg-yellow-900/20 rounded-xl px-4 py-2">
        {/* 접기/열기 버튼 */}
        <div 
          className="flex items-center justify-between cursor-pointer mb-2 hover:opacity-80 transition-opacity"
          onClick={toggleCollapse}
        >
          {/* 현재 메시지 */}
          <div className={`${isLoading ? 'animate-pulse' : ''}`}>
              {currentText}
          </div>
          <div className="flex items-center">
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* 내용 */}
        {!isCollapsed && (
          <div className="italic whitespace-pre-wrap">
            {/* 히스토리 표시 (완료된 메시지들) */}
            {history.slice(0, -1).map((msg, index) => (
              <div key={index} className="mb-2 text-gray-700 dark:text-gray-300">
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoTBubble;