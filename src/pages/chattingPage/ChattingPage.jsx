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
    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    const token = useSelector((state) => state.auth.token);
    const { session_id } = useParams();

    // cot 메시지
    const [cotMessage, setCotMessage] = useState("");
    // 채팅 메시지
    const [messages, setMessages] = useState([
        { id: 1, type: "user", text: "visual studio code 편집기를 이용해 docker 설치방법을 알려줘" },
        { id: 2, type: "feedback", text: "Window, Mac 등 어떤 운영체제를 사용중이신가요?" },
        { id: 3, type: "user", text: "Window 운영체제 사용중이야" },
        { id: 4, type: "ai", text: "Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다.Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다." },
        { id: 5, type: "user", text: "visual studio code 편집기를 이용해 docker 설치방법을 알려줘" },
        { id: 6, type: "feedback", text: "Window 운영체제 사용중이야" },
        { id: 7, type: "user", text: "Window 운영체제 사용중이야" },
        { id: 8, type: "ai", text: "Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다.Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다." },
        { id: 9, type: "user", text: "visual studio code 편집기를 이용해 docker 설치방법을 알려줘" },
        { id: 10, type: "feedback", text: "Window 운영체제 사용중이야" },
        { id: 11, type: "user", text: "Window 운영체제 사용중이야" },
        { id: 12, type: "ai", text: "Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다.Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다." },
    ]);

    // 웹 소켓 연결
    const ws = useRef(null);
    const aiMessageRef = useRef(null);
    useEffect(() => {
        ws.current = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL+`?token=${token}`);

        ws.current.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        ws.current.onmessage = (event) => {
            console.log("서버로부터 메시지 도착:", event.data);
            try {
                const data = JSON.parse(event.data);
                const { type, text } = data;

                let messageType = null;
                if (type === "cot") messageType = "cot";
                else if (type === "hil") messageType = "feedback";
                else if (type === "result") messageType = "ai";
                
                if(messageType === "cot") {
                    setCotMessage((prev) => prev + text);
                    return;
                }

                if (messageType === "ai"){
                    if(text === "[END]") {
                        aiMessageRef.current = null;
                        setCotMessage("");
                        console.log("답변 끝")
                        return;
                    }
                    
                    setMessages((prev) => {
                        if (aiMessageRef.current !== null) {
                            const updated = [...prev];
                            updated[updated.length - 1].text += text;
                            return updated;
                        } else {
                            const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
                            aiMessageRef.current = newId;
                            return [...prev, { id: newId, type: "ai", text}];
                        }
                    });
                    return;
                }
                if (messageType === "feedback") {
                    const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
                    setMessages((prev) => [...prev, { id: newId, type: "feedback", text}]);
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

        return () => {
            ws.current?.close();
        };
        // eslint-disable-next-line
    }, []);

    // 메시지 전송(질문하기)
    const handleSendMessage = async (message, attachedFiles) => {
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
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log("파일 업로드 성공", response.data);
            } catch (err) {
                console.error(err);
            };
        };
        // 웹소켓으로 사용자 질문 전송
        if (ws.current?.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                prompt: message,
                topic: "코딩",
            });
            ws.current.send(payload);
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
                    <div className="w-full max-w-[900px] h-[600px] overflow-y-auto px-10 py-6 mt-8">
                        {/* Chain Of Thought UI 표시 */}
                        {cotMessage && (
                            <ChatBubble id={"cot"} type="ai" text={cotMessage} isCOT={true} />
                        )}
                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} id={msg.id} type={msg.type} text={msg.text} />
                        ))}
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center to-transparent">
                        <ChatInput onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;