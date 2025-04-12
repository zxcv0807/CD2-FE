const ChatBubble = ({ type, text }) => {
    const isQuestion = type === "question";
  
    return (
      <div className={`flex ${isQuestion ? "justify-start" : "justify-end"} mb-4`}>
        <div
          className={`px-4 py-2 rounded-xl max-w-[60%] text-sm whitespace-pre-wrap
            ${isQuestion ? "bg-[#A476CC] text-white" : "bg-[#F5F5F5] text-[#1A1A1A]"}`}
        >
          {text}
        </div>
      </div>
    );
  };
  
  export default ChatBubble;
  