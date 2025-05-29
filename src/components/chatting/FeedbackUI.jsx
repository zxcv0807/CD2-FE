import { useState } from "react";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";

const FeedbackUI = ({ session_id, message_id }) => {
    const [thumbsSubmitted, setThumbsSubmitted] = useState(false);

    // 좋아요, 싫어요
    const handleThumbsUpDown = () => {
        console.log(`${message_id}번째 채팅 추천/비추천`);
    }

    return (
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
    );
};

export default FeedbackUI;