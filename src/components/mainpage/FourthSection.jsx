import FourthSectionBackground from "../../assets/FourthSectionBackground.png";
import FourthSectionEncrypted from "../../assets/FourthSectionEncrypted.png";
import FourthSectionDialog from "../../assets/FourthSectionDialog.png";
import FourthSectionPlanet from "../../assets/FourthSectionPlanet.png";
import QuestionStartIcon2 from "../../assets/QuestionStartIcon2.png";
import RightArrow from "../../assets/RightArrow.png";
import { Link } from "react-router-dom";

const FourthSection = () => {
    return (
        <section 
            className="mt-[100px] relative w-full bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url(${FourthSectionBackground})` }}  
        >
            {/* 네 번째 섹션 내용 */}
            <div className="md:w-[60%] w-[80%] mx-auto py-32">
                {/* 제목 및 설명 */}
                <div className="text-left mb-20">
                    <h4 className="text-xl font-semibold text-[#A476CC] mb-8">
                        스마트한 대화 최적화
                    </h4>
                    <h2 className="text-3xl font-bold mb-8">
                        대화 효율을 극대화하다,<br />
                        최적화된 AI로 더 빠르고 안전하게
                    </h2>
                    <p className="text-sm text-[#DADADA] mt-4">
                        프롬프트 최적화 시스템을 통해 불필요한 대화 횟수를 줄이고,
                        더 빠르고 정확한 답변을 제공합니다. <br />
                        이 과정에서 전력 소비와 탄소 배출을 감소시켜 환경을 보호하며,
                        개인정보도 안전하게 지킬 수 있습니다.
                    </p>
                </div>

                {/* 카드 섹션 */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    {/* 첫 번째 카드 섹션 */}
                    <div className="bg-white/20 px-6 py-[50px] rounded-lg text-left flex flex-col items-center">
                        <div className="mb-8 w-full flex justify-center">
                            <img src={FourthSectionDialog} className="block" />
                        </div>
                        <div className="w-full md:text-left text-center">
                            <h3 className="mb-4 text-lg font-semibold">지루하지 않은 대화</h3>
                            <p className="text-sm text-[#DADADA] mt-2">
                                프롬프트 최적화로 대화 횟수를 줄여<br />
                                맥락 흐름을 높이세요.
                            </p>
                        </div>
                    </div>

                    {/* 두 번째 카드 섹션 */}
                    <div className="bg-white/20 px-6 py-[50px] rounded-lg text-left flex flex-col items-center">
                        <div className="mb-8 w-full flex justify-center">
                            <img src={FourthSectionPlanet} className="block" />
                        </div>
                        <div className="w-full md:text-left text-center">
                            <h3 className="mb-4 text-lg font-semibold">환경 오염 최소화</h3>
                            <p className="text-sm text-[#DADADA] mt-2">
                                최적화된 AI 대화로 전력 소비와<br />
                                탄소 배출을 줄여 지구를 보호하세요.
                            </p>
                        </div>
                    </div>

                    {/* 세 번째 카드 섹션 */}
                    <div className="bg-white/20 px-6 py-[50px] rounded-lg text-left flex flex-col items-center">
                        <div className="mb-8 w-full flex justify-center">
                            <img src={FourthSectionEncrypted} className="block" />
                        </div>
                        <div className="w-full md:text-left text-center">
                            <h3 className="mb-4 text-lg font-semibold">안전한 개인정보</h3>
                            <p className="text-sm text-[#DADADA] mt-2">
                                대화 로그는 철저히 보호되며,<br />
                                다른 사용자에게 공유되지 않습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3번째 섹션 */}
                <div className="mt-40 text-center">
                    <h2 className="text-3xl font-semibold">
                        <span className="text-[#A476CC]">더욱 최적화된 AI</span>와의 대화가 준비되었습니다.<br />
                        지금 바로 시작해보세요.
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
                        <Link to="/topics" className="px-2 py-2 bg-[#A476CC] rounded-full flex justify-between items-center space-x-2 w-fit">
                            <span className="mx-4">질문 시작하기</span>
                            <img src={QuestionStartIcon2}/>
                        </Link>
                        <Link to="/guideline" className="px-2 py-2 bg-[#262626] rounded-full flex justify-between items-center space-x-2 w-fit">
                            <span className="ml-2">가이드라인 보기</span>
                            <img src={RightArrow} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FourthSection;