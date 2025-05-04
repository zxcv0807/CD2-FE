import { useState } from "react";

const ChatInputTooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute whitespace-nowrap bg-[#6A4B85] text-white text-xs px-2 py-1 rounded-md z-10
            ${position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" : ""}
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ChatInputTooltip;
