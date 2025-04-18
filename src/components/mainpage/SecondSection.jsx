import { useEffect, useRef, useState } from "react";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";

const SecondSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const target = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.8 }
        );

        if (target) observer.observe(target);  
        return () => target && observer.unobserve(target);
    }, []);

    return (
        <section ref={sectionRef} className="w-[60%] flex flex-col items-center text-center mt-32">
            <h4 className="text-2xl text-[#A476CC] font-semibold mb-4">개인 맞춤형 최적화</h4>
            <h2 className="text-3xl text-[#1A1A1A] font-semibold mb-6">
                더 스마트한 대화로 이끄는 AI,<br />
                최적화된 질문이 더 정확한 답을 만듭니다.
            </h2>
            <p className="text-[#4E4E4E] mb-16">
                AI의 최적화 기능이 질문을 다듬어 대화를 더욱 스마트하게 만들어 줍니다.<br />
                역질문을 통해 의도를 정확히 파악하고, 더 깊이 있는 답변을 제공합니다.
            </p>

            {/* 토글 */}
            <div className="flex items-center gap-2 bg-white text-[#4E4E4E] rounded-md px-8 py-2 shadow-xl focus:outline-none mb-16">
                대화 최적화하기
                <div className={`w-10 h-5 rounded-full relative transition-colors duration-700 ${isVisible ? "bg-[#A476CC]" : "bg-[#F5F5F5]"}`}>
                    <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0 transition-all duration-700 ${isVisible ? "translate-x-5" : "translate-x-0"}`}
                    />
                </div>
            </div>

            {/* 채팅 UI */}
            <div className="flex flex-col gap-4 w-full">

                {/* 사용자 질문 */}
                <div className={`self-end bg-[#F5F5F5] text-[#1A1A1A] rounded-tl-xl rounded-tr-xl rounded-bl-xl p-4 w-fit max-w-[70%] transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    visual studio code 편집기를 이용해 docker 설치방법을 알려줘
                </div>

                {/* AI 질문 */}
                <div className={`self-start bg-[#A476CC] text-white rounded-tl-xl rounded-tr-xl rounded-br-xl p-4 w-fit max-w-[70%] transform transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    Window, Mac 중 어떤 운영체제를 사용하고 계신가요?
                </div>

                {/* 사용자 답변 */}
                <div className={`self-end bg-[#F5F5F5] text-[#1A1A1A] rounded-tl-xl rounded-tr-xl rounded-bl-xl p-4 w-fit max-w-[70%] transform transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    Window 운영체제 사용중이야
                </div>

                {/* 최적화된 질문 */}
                <div className={`self-start text-[#1A1A1A] bg-white rounded-xl p-4 transform transition-all duration-700 ease-out delay-600 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    Windows 운영체제에서 visual studio code 편집기를 이용해 docker 설치하는 방법
                </div>

                {/* 구분선 */}
                <hr className={`flex-1 border-[#DADADA] transition-opacity duration-700 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

                {/* 피드백 */}
                <div className={`flex items-center gap-2 text-[#999999] text-sm transition-all duration-700 ease-out delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                    해당 내용이 최적화된 답변이었나요?
                    <img src={ThumbsUp} />
                    <img src={ThumbsDown} />
                </div>
            </div>
        </section>
    );
};

export default SecondSection;
