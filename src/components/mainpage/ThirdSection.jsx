import { useState, useEffect, useRef } from "react";
import ThumbsUp from "../../assets/ThumbsUp.png";
import ThumbsDown from "../../assets/ThumbsDown.png";
import SpeechBubble from "../../assets/SpeechBubble.png";

const ThirdSection = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const sectionRef = useRef(null);

    // 스크롤 감지
    useEffect(() => {
        const target = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && activeIndex === -1) {
                    setActiveIndex(0);
                }
            },
            { threshold: 0.5 }
        );
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [activeIndex]);
    
    // 주제 버튼 색상 변경
    useEffect(() => {
        if (activeIndex >= 0 && activeIndex < 4) {
            const interval = setInterval(() => {
                setActiveIndex((prevIndex) => prevIndex + 1);
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [activeIndex]);

    return (
        <section className="w-[60%] mx-auto mt-48">
            {/* POINT 1 */}
            <div className="text-left">
                <h4 className="text-lg font-semibold text-[#A476CC] mb-6">POINT 1</h4>
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                    대화의 방향을 설정하고, 더 최적화된 답변을 받아보세요.
                </h2>
                <p className="text-sm text-[#4E4E4E] mb-8">
                    원하는 주제를 선택하면 AI가 대화를 더욱 정확하게 이해하고 향상된 답변을 제공합니다. <br/>
                    질문에 대한 맥락을 더 명확하게 설정하여 효과적인 지식을 경험하세요.
                </p>
                <div ref={sectionRef} className="flex gap-2 text-[#4E4E4E] mb-8">
                    {["주제 1", "주제 2", "주제 3", "주제 4", "주제 5"].map((text, index) => (
                        <button
                            key={index}
                            className={`px-6 py-2 rounded-full border border-[#DADADA] transition-all duration-500 ${
                                index === activeIndex ? "bg-[#A476CC] text-white border-[#A476CC]" : "bg-white"
                            }`}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            </div>

            {/* 구분선 (가로 점선 + 중앙 점 + 세로 점선) */}
            <div className="relative flex justify-center my-12">
                {/* 가로 점선 */}
                <div className="w-full border-t border-dashed border-gray-300"></div>

                {/* 세로 점선 */}
                <div className="absolute top-0 left-1/2 h-[320px] border-l border-dashed border-gray-300"></div>
            </div>

            {/* POINT 2 & POINT 3 */}
            <div className="grid grid-cols-2 gap-12">
                {/* POINT 2 */}
                <div>
                    <h4 className="text-lg font-semibold text-[#A476CC] mb-6">POINT 2</h4>
                    <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                        필요한 때만 최적화,<br /> 원하는 방식으로 대화하세요.
                    </h2>
                    <p className="text-sm text-[#4E4E4E] mb-8">
                        최적화 기능을 켜면 AI가 역역질문을 통해 <br />
                        답변을 더욱 정교하게 다듬어 줍니다.<br />
                        상황에 따라 자유롭게 ON/OFF를 조절하며<br />
                        원하는 방식으로 소통해보세요.
                    </p>
                    <div className="flex gap-2">
                        <button className="flex gap-2 px-4 py-2 bg-[#C3C3C3] text-white rounded-md items-center">
                            <img src={SpeechBubble} className="h-[18px]"/>
                            최적화하기
                        </button>
                        <button className="flex gap-2 px-4 py-2 bg-[#A476CC] text-white rounded-md items-center">
                            <img src={SpeechBubble} className="h-[18px]"/>
                            최적화하기
                        </button>
                    </div>
                </div>
                
                {/* POINT 3 */}
                <div className="ml-4">
                    <h4 className="text-lg font-semibold text-[#A476CC] mb-6">POINT 3</h4>
                    <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                        더 나은 대화를 위한 피드백,<br /> 당신의 의견을 들려주세요.
                    </h2>
                    <p className="text-sm text-[#4E4E4E] mb-8">
                        최적화된 대화가 만족스러우셨나요?<br />
                        "좋았다"또는 "별로였다"를 선택하여 의견을 남겨주세요. <br />
                        여러분의 피드백을 반영해해<br />
                        더욱 정교한 AI 대화를 만들어 갑니다.
                    </p>
                    <div className="flex items-center gap-2 text-[#999999] text-sm">
                        해당 내용의 최적화 답변이 어떠셨나요?
                        <img src={ThumbsUp} />
                        <img src={ThumbsDown} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThirdSection;
