import { useSelector } from "react-redux";
import Sidebar from "../../components/chatting/Sidebar";
import ChatHeader from "../../components/header/ChatHeader";
import ChatBubble from "../../components/chatting/ChatBubble";
import ChatInput from "../../components/chatting/ChatInput";

const ChattingPage = () => {
    const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);
    const sidebarWidth = isChatListVisible ? 500 : 80;

    return (
        <div className="relative flex h-screen">
            <Sidebar />
            <ChatHeader />
            <div
                className="transition-all duration-300 relative flex-1"
                style={{ width: `calc(100% - ${sidebarWidth}px)`}}
            >
                {/* 채팅 + 입력창 포함된 컨테이너 */}
                <div className="h-full flex flex-col bg-[#FAFAFA] items-center px-4 relative">
                    <div className="w-full max-w-[1400px] h-[600px] overflow-y-auto px-10 py-6 mt-8">
                        {/* 채팅 말풍선들 */}
                        <ChatBubble type="answer" text="visual studio code 편집기를 이용해 docker 설치방법을 알려줘" />
                        <ChatBubble type="question" text="Window, Mac 등 어떤 운영체제를 사용중이신가요?" />
                        <ChatBubble type="answer" text="Window 운영체제 사용중이야" />
                        <ChatBubble type="answer" text="Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다.Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다."/>
                        <ChatBubble type="answer" text="visual studio code 편집기를 이용해 docker 설치방법을 알려줘" />
                        <ChatBubble type="question" text="Window, Mac 등 어떤 운영체제를 사용중이신가요?" />
                        <ChatBubble type="answer" text="Window 운영체제 사용중이야" />
                        <ChatBubble type="answer" text="Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다.Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다."/>
                        <ChatBubble type="answer" text="visual studio code 편집기를 이용해 docker 설치방법을 알려줘" />
                        <ChatBubble type="question" text="Window, Mac 등 어떤 운영체제를 사용중이신가요?" />
                        <ChatBubble type="answer" text="Window 운영체제 사용중이야" />
                        <ChatBubble type="answer" text="Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치방법은 다음과 같습니다."/>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center bg-gradient-to-t from-[#FAFAFA] to-transparent">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChattingPage;