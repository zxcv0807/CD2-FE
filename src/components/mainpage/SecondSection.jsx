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
        <section ref={sectionRef} className="md:w-[60%] w-[80%] flex flex-col items-center mt-32">
            <h4 className="text-2xl text-[#A476CC] font-semibold mb-4">개인 맞춤형 최적화</h4>
            <h2 className="text-3xl text-[#1A1A1A] dark:text-white text-center font-semibold mb-6">
                더 스마트한 대화로 이끄는 AI,<br />
                최적화된 질문이 더 정확한 답을 만듭니다.
            </h2>
            <p className="text-[#4E4E4E] dark:text-[#BBBBBB] mb-16">
                AI의 최적화 기능이 질문을 다듬어 대화를 더욱 스마트하게 만들어 줍니다.<br />
                역질문을 통해 의도를 정확히 파악하고, 더 깊이 있는 답변을 제공합니다.
            </p>

            {/* 토글 */}
            <div className="flex items-center gap-2 bg-white dark:bg-[#2E2C36] text-[#4E4E4E] dark:text-[#BBBBBB] rounded-md px-8 py-2 shadow-xl focus:outline-none mb-16">
                대화 최적화하기
                <div className={`w-10 h-5 rounded-full relative transition-colors duration-700 ${isVisible ? "bg-[#A476CC]" : "bg-[#C3C3C3]"}`}>
                    <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0 transition-all duration-700 ${isVisible ? "translate-x-5" : "translate-x-0"}`}
                    />
                </div>
            </div>

            {/* 채팅 UI */}
            <div className="flex flex-col gap-4 w-full">
                {/* 사용자 질문 */}
                <div className={`self-end bg-[#F5F5F5] dark:bg-[#4E4E4E] text-[#1A1A1A] dark:text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 w-fit max-w-[70%] transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    tailwindcss v4에 대해서 알려줘
                </div>
                {/* AI 질문 */}
                <div className={`self-start bg-[#A476CC] text-white rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 w-fit max-w-[70%] transform transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    tailwindcss v4에 대한 어떤 정보가 필요하신가요? 예를 들어, 설치 방법이나 새로운 기능에 대해 알고 싶으신가요?
                </div>
                {/* 사용자 답변 */}
                <div className={`self-end bg-[#F5F5F5] dark:bg-[#4E4E4E] text-[#1A1A1A] dark:text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 w-fit max-w-[70%] transform transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                   기존에 v3를 사용하던 개발자들이 알아야할 업데이트 사항
                </div>
                {/* 최적화된 질문 */}
                <div className={`self-start text-[#1A1A1A] dark:text-white bg-white dark:bg-[#18171C] rounded-xl w-fit transform transition-all duration-700 ease-out delay-600 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
                    Tailwind CSS v4에 대해 자세히 설명해 주세요. 
                    주요 기능과 이전 버전 대비 개선 사항을 포함하고, 사용자 피드백을 바탕으로 한 업데이트 사항도 언급해 주세요. 
                    또한, 다양한 프로젝트에서 유틸리티 클래스를 사용하는 방법에 대한 실용적인 예시를 제공해 주시고, 개인적으로 유용했던 기능이나 특정 사용 사례에 대한 경험도 공유해 주세요.
                </div>
                {/* 구분선 */}
                <hr className={`flex-1 border-[#DADADA] transition-opacity duration-700 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
                {/* 피드백 */}
                <div className={`flex items-center gap-2 text-[#999999] dark:text-[#888888] text-sm transition-all duration-700 ease-out delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                    해당 내용이 최적화된 답변이었나요?
                    <img src={ThumbsUp} />
                    <img src={ThumbsDown} />
                </div>
            </div>
        </section>
    );
};

export default SecondSection;
