import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "../../api/axiosInstance";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";
import ChatBubble from "../../components/chatting/ChatBubble";
import ChatInput from "../../components/chatting/ChatInput";
import { useParams } from "react-router-dom";

const ChattingPage = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const { session_id, } = useParams();
    const ws = useRef(null);
    const aiMessageRef = useRef(null);
    const chatInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [isAiAccepting, setIsAiAccepting] = useState(false);
    const [isCotLoading, setIsCotLoading] = useState(false);
    const [cotMessage, setCotMessage] = useState("");
    const [isHitlActive, setIsHitlActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [topic, setTopic] = useState("");
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    

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
                console.log(response.data);
                setTopic(response.data.topics[0]);
                const formattedMessages = response.data.messages.map(msg => ({
                    id: msg.doc_id,
                    type: msg.role,
                    text: msg.page_content,
                    timestamp: msg.timestamp,
                }));
                setMessages(formattedMessages);
            } catch(err) {
                console.error("대화 목록 불러오기 실패", err);
            }
        }

        fetchMessageList();
    }, [session_id, token, userId]);

    // 웹 소켓 연결
    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL+`/${session_id}`);

            ws.current.onopen = () => {
                console.log("WebSocket 연결됨");
            };

            ws.current.onmessage = (event) => {
                console.log("서버로부터 메시지 도착:", event.data);
                try {
                    const data = JSON.parse(event.data);
                    const { type, text } = data;

                    switch(type) {
                        case "cot":
                            setCotMessage(text);
                            setIsCotLoading(true);
                            break;
                        case "hitl":
                            setMessages((prev) => [...prev, { 
                                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, 
                                type: "feedback", 
                                text 
                            }]);
                            setIsHitlActive(true);
                            setIsCotLoading(false);
                            setCotMessage("");
                            break;
                        case "hitl_error":
                            setMessages((prev) => [...prev, { 
                                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, 
                                type: "error", 
                                text 
                            }]);
                            setIsHitlActive(false);
                            setIsCotLoading(false);
                            setCotMessage("");
                            setIsAiAccepting(false);
                            break;
                        case "result_start":
                            setMessages((prev) => { 
                                const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
                                return [...prev, {
                                    id: newId,
                                    type:"ai",
                                    text: ""
                                }];
                            });
                            setIsCotLoading(false);
                            setIsAiAccepting(true);
                            break;
                        case "optimize":
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIndex = updated.length - 1;
                                
                                // 마지막 메시지가 optimize 타입이면 텍스트를 누적
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
                                
                                if (updated.length > 0 && updated[lastIndex].type === "ai") {
                                    updated[lastIndex] = {
                                        ...updated[lastIndex],
                                        text: updated[lastIndex].text + text
                                    };
                                } else {
                                    const newId = updated.length > 0 ? updated[updated.length - 1].id + 1 : 1;
                                    updated.push({
                                        id: newId,
                                        type: "ai",
                                        text: text
                                    });
                                }
                                return updated;
                            });
                            setCotMessage("");
                            break;
                        case "result_end":
                            aiMessageRef.current = null;
                            setIsCotLoading(false);
                            setCotMessage("");
                            setIsAiAccepting(false);
                            setIsHitlActive(false);
                            console.log("답변 끝");
                            break;
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
    const handleSendMessage = async (message, attachedFiles, isWebSearchActive, isOptimized, currentModelId) => {
        // ai 답변을 받는 중이라면
        chatInputRef.current?.handleAttemptSend(isAiAccepting, isHitlActive);
        if (isAiAccepting && !isHitlActive) {
            return;
        }

        const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;

        const userMsg = { id: newId, type: "user", text: message };
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
                        optimize: isOptimized,
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
        <div className="flex h-screen">
            <Sidebar isSidebarVisible={isSidebarVisible}/>
            <ChatHeader onToggleSidebar={handleToggleSidebar}/>
            <div
                className="transition-all duration-300 mt-16 md:mt-0 w-full md:w-auto"
                style={{ width: `100%`, marginLeft: 0, flexGrow: 1, marginRight: 0 }}
            >
                {/* 채팅 + 입력창 포함된 컨테이너 */}
                <div className="h-full flex flex-col bg-[#FAFAFA] dark:bg-[#18171C] items-center px-2 relative">
                    <div ref={chatContainerRef} className="w-full max-w-[900px] md:h-[80%] h-[85%] overflow-y-auto px-10 py-6 md:mt-8">
                        {/* 대화 메시지 */}
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} id={msg.id} type={msg.type} text={msg.text} isAiAccepting={msg.type === "ai" && isAiAccepting} session_id={session_id} />
                        ))}
                        {/* Chain Of Thought UI 표시 */}
                        {cotMessage && (
                            <ChatBubble id={"cot"} type="ai" text={cotMessage} isCOT={true} isCotLoading={isCotLoading}/>
                        )}
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center to-transparent">
                        <ChatInput 
                            onSendMessage={handleSendMessage}
                            ref={chatInputRef}
                            isAiAccepting={isAiAccepting}
                            isHitlActive={isHitlActive}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;