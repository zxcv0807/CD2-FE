// ai와 채팅 페이지

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";
import ChatBubble from "../../components/chatting/ChatBubble";
import CoTBubble from "../../components/chatting/CoTBubble";
import ChatInput from "../../components/chatting/ChatInput";

const ChattingPage = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 사이드바 상태
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const { session_id, } = useParams(); // URL 파라미터에서 session_id 추출

    const ws = useRef(null); // 웹소켓 참조
    const aiMessageRef = useRef(null); // ai 메시지 참조
    const chatInputRef = useRef(null); // 채팅 입력창 참조
    const chatContainerRef = useRef(null); // 채팅 컨테이너 참조

    const [isReportTyping, setIsReportTyping] = useState(false); // 리포트 작성 중 여부
    const [isCotLoading, setIsCotLoading] = useState(false); // Chain of Thought 로딩 여부
    const [cotMessage, setCotMessage] = useState(""); // Chain of Thought 메시지
    const [cotHistory, setCotHistory] = useState([]); // Chain of Thought 히스토리
    const [isHitlActive, setIsHitlActive] = useState(false); // HITL 모드 활성화 여부
    const [messages, setMessages] = useState([]); // 대화 메시지 목록
    const [topic, setTopic] = useState(""); // 대화 주제
    const [isUserScrolling, setIsUserScrolling] = useState(false); // 사용자 스크롤 여부
    const [isCurrentConversationEnded, setIsCurrentConversationEnded] = useState(false); // 현재 대화가 끝났는지 여부
    const [completedMessages, setCompletedMessages] = useState(new Set()); // 완료된 메시지 ID 집합

    // 스크롤 이벤트 핸들러 추가
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px 여유
            
            if (!isAtBottom) {
                setIsUserScrolling(true);
            } else {
                setIsUserScrolling(false);
            }
        }
    };
    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll);
            return () => chatContainer.removeEventListener('scroll', handleScroll);
        }
    }, []);
    // 스크롤 아래로 이동
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current && !isUserScrolling) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };
        scrollToBottom();   
    }, [messages, cotMessage, isUserScrolling]);

    // 사이드바 열고 닫기
    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // 웹소켓 대화 완료
    const isMessageCompleted = (message) => {
        // optimize나 report 타입이 아니면 피드백 UI 안보임
        if (message.type !== 'optimize' && message.type !== 'report') {
            return false;
        }
        // message_id가 있고 completedMessages에 포함되어 있으면 완료
        if (message.message_id && completedMessages.has(message.message_id)) {
            return true;
        }
        // message_id가 없는 현재 진행중인 대화는 result_end 받았을 때만 완료
        if (!message.message_id) {
            return isCurrentConversationEnded && !isReportTyping;
        }
        return false;
    };

    // 대화 목록 불러오기
    useEffect(() => {
        const fetchMessageList = async () => {
            try {
                const response = await axios.post("/api/v1/faiss/history", 
                    {
                        session_id: session_id,
                        user_id: userId,
                    }
                );
                setTopic(response.data.topics[0]);
                // timestamp 기준으로 정렬
                const sortedMessages = response.data.messages.sort((a, b) => 
                    new Date(a.timestamp) - new Date(b.timestamp)    
                )
                const formattedMessages = sortedMessages.map((msg, index) => ({
                    id: index,
                    message_id: msg.message_id,
                    type: msg.role,
                    text: msg.page_content,
                    timestamp: msg.timestamp,
                    recommendation_status: msg.recommendation_status,
                }));
                // 기존 메시지들의 message_id를 completedMessages에 추가
                const existingMessageIds = formattedMessages
                    .filter(msg => msg.message_id && (msg.type === 'optimize' || msg.type === 'report'))
                    .map(msg => msg.message_id);
                setCompletedMessages(new Set(existingMessageIds));

                setMessages(formattedMessages);
            } catch(err) {
                console.error("대화 목록 불러오기 실패", err);
            }
        }

        fetchMessageList();
    }, [session_id, userId]);
    
    // 웹 소켓 연결
    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL+`/${session_id}`);

            ws.current.onopen = () => {
                console.log("WebSocket 연결됨");
            };

            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const { type, text } = data;

                    switch(type) {
                        case "cot":
                            setCotMessage(text);
                            setCotHistory(prev => [...prev, text]); 
                            setIsCotLoading(true);
                            break;
                        case "hitl":
                            setMessages((prev) => [...prev, { 
                                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, 
                                type: "hitl_ai", 
                                text 
                            }]);
                            setIsHitlActive(true);
                            setIsCotLoading(false);
                            break;
                        case "hitl_error":
                            setMessages((prev) => [...prev, { 
                                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, 
                                type: "error", 
                                text 
                            }]);
                            setIsHitlActive(false);
                            setIsCotLoading(false);
                            setIsReportTyping(false);
                            break;
                        case "result_start":
                            setMessages((prev) => { 
                                const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
                                return [...prev, {
                                    id: newId,
                                    type:"report",
                                    text: ""
                                }];
                            });
                            setIsCotLoading(false);
                            setIsReportTyping(true);
                            break;
                        case "optimize":
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIndex = updated.length - 1;
                                
                                if (updated.length > 0 && updated[lastIndex].type === "optimize") {
                                    updated[lastIndex] = {
                                        ...updated[lastIndex],
                                        text: updated[lastIndex].text + text
                                    };
                                } else {
                                    // 새로운 optimize 메시지 시작
                                    const newId = updated.length > 0 ? updated[updated.length - 1].id + 1 : 1;
                                    updated.push({
                                        id: newId,
                                        type: "optimize",
                                        text: text
                                    });
                                }
                                return updated;
                            });
                            break;
                        case "result":
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIndex = updated.length - 1;
                                
                                if (updated.length > 0 && updated[lastIndex].type === "report") {
                                    updated[lastIndex] = {
                                        ...updated[lastIndex],
                                        text: updated[lastIndex].text + text
                                    };
                                } else {
                                    const newId = updated.length > 0 ? updated[updated.length - 1].id + 1 : 1;
                                    updated.push({
                                        id: newId,
                                        type: "report",
                                        text: text
                                    });
                                }
                                return updated;
                            });
                            break;
                        case "result_end": {
                            const saved_message_ids = data.saved_message_ids;

                            if (saved_message_ids) {
                                setMessages((prev) => {
                                    return prev.map((message) => {
                                        // message_id가 없고, 해당 type에 대해 서버에서 ID를 줬다면 업데이트
                                        if (!message.message_id && saved_message_ids[message.type]) {
                                            const newMessageId = saved_message_ids[message.type];
                                            setCompletedMessages(prevCompleted => new Set([...prevCompleted, newMessageId]));
                                            return {
                                                ...message,
                                                message_id: saved_message_ids[message.type],
                                            };
                                        }
                                        return message;
                                    });
                                });
                            } else {
                                console.warn("result_end: saved_message_ids 없음");
                            }
                            aiMessageRef.current = null;
                            setIsCotLoading(false);
                            setIsReportTyping(false);
                            setIsHitlActive(false);
                            setIsCurrentConversationEnded(true);
                            break;
                        }
                        case "error":
                            console.error("WebSocket error:", text);
                            break;
                    }
                } catch (err) {
                    console.error("메시지 파싱 실패", err);
                }
            };
            ws.current.onerror = (error) => {
                console.error("WebSocket 에러", error);
            };
            ws.current.onclose = () => {
                console.log("WebSocket 종료");
            };
        };

        connectWebSocket(); 

        return () => {
            ws.current?.close();
        };
    }, [session_id]);
    // 메시지 전송
    const handleSendMessage = async (message, attachedFiles, isWebSearchActive, isReportActive, currentModelId) => {
        // ai 답변을 받는 중이라면
        chatInputRef.current?.handleAttemptSend(isReportTyping, isHitlActive);
        if (isReportTyping && !isHitlActive) {
            return;
        }
        
        if (!isHitlActive) {
            setCotMessage("");
            setCotHistory([]);
            setIsCurrentConversationEnded(false);
        }

        const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;

        const userMsg = { 
            id: newId, 
            type: isHitlActive ? "hitl_user" : "user", 
            text: message 
        };
        setMessages((prev) => [...prev, userMsg]);

        // 첨부파일 전송
        if (attachedFiles.length > 0) {
            try{
                const formData = new FormData();
                attachedFiles.forEach((file) => {
                    formData.append("files", file);
                });

                const response = await axios.post(`/api/v1/files/${session_id}/files`,
                    formData,
                );
                console.log("파일 업로드 성공", response.data);
            } catch (err) {
                console.error(err);
            };
        };
        // 웹소켓으로 사용자 질문 전송
        if (ws.current?.readyState === WebSocket.OPEN) {
            if (isHitlActive) {
                const feedback = JSON.stringify({
                    feedback: message
                })
                ws.current.send(feedback);
                setIsHitlActive(false);
            } else {
                const payload = JSON.stringify({
                    token: token,
                    prompt: message,
                    topic: topic,
                    option: {
                        web_search: isWebSearchActive,
                        file: attachedFiles > 0,
                        optimize: isReportActive,
                        model: currentModelId,
                    }
                });
                ws.current.send(payload);
            }
            
        } else {
            console.warn("WebSocket이 아직 연결되지 않았습니다.");
        }
    };
    
    return (
        <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#18171C]">
            <Sidebar isSidebarVisible={isSidebarVisible}/>
            <ChatHeader onToggleSidebar={handleToggleSidebar}/>
            <div
                className="transition-all duration-300 mt-16 md:mt-0 w-full md:w-auto"
                style={{ width: `100%`, marginLeft: 0, flexGrow: 1, marginRight: 0 }}
            >
                {/* 채팅 + 입력창 포함된 컨테이너 */}
                <div className="h-full flex flex-col items-center px-2 relative">
                    <div ref={chatContainerRef} className="w-full max-w-[900px] md:h-[80%] h-[85%] overflow-y-auto px-10 py-6 md:mt-8">
                        {/* 대화 메시지 */}
                        {messages.map((msg, index) => (    
                            <ChatBubble 
                                key={msg.id} 
                                type={msg.type} 
                                text={msg.text} 
                                isTyping={msg.type === "report" && isReportTyping} 
                                session_id={session_id} 
                                message_id={msg.message_id} 
                                isCompleted={isMessageCompleted(msg)}
                                recommendation_status={msg.recommendation_status}
                                messages={messages}
                                currentIndex={index}
                            />
                        ))}
                        {/* Chain Of Thought UI 표시 */}
                        {cotMessage && (
                            <CoTBubble currentText={cotMessage} isLoading={isCotLoading} history={cotHistory}/>
                        )}
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center to-transparent">
                        <ChatInput 
                            onSendMessage={handleSendMessage}
                            ref={chatInputRef}
                            isAiAccepting={isReportTyping}
                            isHitlActive={isHitlActive}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;