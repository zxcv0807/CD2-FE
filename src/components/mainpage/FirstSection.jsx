import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import MainPageLaptop from "../../assets/MainPageLaptop.png";
import QuestionStartIcon from "../../assets/QuestionStartIcon.png";

const FirstSection = () => {
    const texts = useMemo(() => ["당신의 질문", "당신의 궁금증", "당신의 생각"], []);
    const [currentText, setCurrentText] = useState(texts[0]);
    const [fade, setFade] = useState(true); // 페이드 애니메이션 상태

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // 먼저 투명하게 만들기

            setTimeout(() => {
                setCurrentText((prevText) => {
                    const nextIndex = (texts.indexOf(prevText) + 1) % texts.length;
                    return texts[nextIndex];
                });
                setFade(true); // 다시 나타나게 만들기
            }, 500); // 0.5초 후 변경
        }, 3000); // 3초마다 변경

        return () => clearInterval(interval);
    }, [texts]);

    return (
        <section className="flex flex-col items-center text-center mt-16 px-4 pt-20">
            {/* 원형 그라데이션션 배경 */}
            <div className="absolute w-[672px] h-[672px] right-[40px] top-[-100px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(82,122,255,0.2)_0%,rgba(82,122,255,0)_100%)]"></div>
            <div className="absolute w-[672px] h-[672px] left-[120px] top-[150px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(164,118,204,0.2)_0%,rgba(164,118,204,0)_100%)]"></div>

            {/* 제목 */}
            <h2 className="text-4xl font-bold">
                <span className={`text-[#A476CC] transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                    {currentText},
                </span>
                <br />
                <span className="text-[#1A1A1A]">더 정교하게 다듬어 드립니다.</span>
            </h2>

            {/* 내용 */}
            <p className="text-sm text-[#4E4E4E] mt-4">
                AI가 더 정확하고 유용한 답변을 제공할 수 있도록, 질문을 최적화해드립니다.<br />
                프롬프트를 다듬으면 원하는 정보를 더욱 빠르고 정확하게 얻을 수 있습니다. 지금 최적의 질문을 만들어보세요!
            </p>

            {/* 질문 시작하기 버튼 */}
            <Link to="/chat-start" className="w-[240px] mt-10 px-2 py-1 border border-[#DADADA] rounded-full flex justify-between items-center space-x-2 cursor-pointer z-5">
                <span className="text-[#1A1A1A] ml-4">질문 시작하기</span>
                <img src={QuestionStartIcon} />
            </Link>

            {/* 노트북 이미지 */}
            <div className="-mt-[50px] z-2" style={{
                maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)"
            }}>
                <img src={MainPageLaptop} alt="Laptop" />
            </div>
        </section>
    );
};

export default FirstSection;
