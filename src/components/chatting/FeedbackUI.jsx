// 한 번의 대화 싸이클 종료 후에 대화에 대한 추천/비추천 피드백을 제공하는 UI 컴포넌트

import { useState } from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import axios from "../../api/axiosInstance";
import Tooltip from "../modal/Tooltip";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";
import ThumbsUpPurple from "../../assets/ThumbsUpPurple.png";
import ThumbsDownGrey from "../../assets/ThumbsDownGrey.png";


const FeedbackUI = ({ session_id, message_id, messageText, recommendation_status }) => {
    const [feedbackType, setFeedbackType] = useState(recommendation_status); // 초기 피드백 상태를 props로 받음
    const { copyToClipboard, isCopied } = useCopyToClipboard(); // 커스텀 훅을 사용하여 클립보드 복사 기능 구현

    // 좋아요, 싫어요
    const handleThumbsUpDown = async (rating) => {
        // 이미 선택된 상태면 아무것도 하지 않음
        if (feedbackType === rating) {
            return;
        }
        
        try {
            const response = await axios.post('/api/v1/preference/submit', {
                message_id: message_id,
                rating: rating,
                session_id: session_id,
            });
            console.log(response.data);
            setFeedbackType(rating);
        } catch (err) {
            console.error("피드백 전송 실패:", err);
        }
    };

    return (
        <>
            {/* 구분선 */}
            <div className="w-full h-px bg-[#DADADA] my-3"></div>
            
            {/* 답변에 대한 피드백 */}
            <div className="w-full flex justify-between items-center">
                {/* 복사하기 버튼 (왼쪽) */}
                <button
                    onClick={() => copyToClipboard(messageText, 'feedback')}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 
                               hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
                               rounded transition-colors duration-200"
                >
                    {isCopied('feedback') ? (
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
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#999999]">해당 내용의 적절한 답변이 어땠나요?</span>
                    {/* 좋아요, 싫어요 아이콘 */}
                    {feedbackType === 'like' ? (
                        <Tooltip text="추천" position="top">
                            <img 
                                src={ThumbsUpPurple} 
                                className="cursor-default"
                            />
                        </Tooltip>
                    ) : feedbackType === 'dislike' ? (
                        <Tooltip text="비추천" position="top">
                            <img 
                                src={ThumbsDownGrey} 
                                className="cursor-default"
                            />
                        </Tooltip>
                    ) : (
                        <>
                            <Tooltip text="추천" position="top">
                                <img 
                                    src={feedbackType === 'like' ? ThumbsUpPurple : ThumbsUp} 
                                    className={`cursor-pointer ${feedbackType === 'like' ? 'cursor-default' : 'hover:opacity-70'}`}
                                    onClick={() => handleThumbsUpDown("like")}
                                />
                            </Tooltip>
                            <Tooltip text="비추천" position="top">
                                <img 
                                    src={feedbackType === 'dislike' ? ThumbsDownGrey : ThumbsDown} 
                                    className={`cursor-pointer ${feedbackType === 'dislike' ? 'cursor-default' : 'hover:opacity-70'}`}
                                    onClick={() => handleThumbsUpDown("dislike")}
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeedbackUI;