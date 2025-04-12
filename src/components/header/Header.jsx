import { Link } from "react-router-dom";
import LogoIcon from "../../assets/LogoIcon.png";
import LogoIconWhite from "../../assets/LogoIconWhite.png";

const Header = ( {isDarkSection }) => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-16 py-4 bg-transparent z-5">
      {/* 좌측 로고 */}
      <Link to="/" className="text-lg font-semibold flex gap-2 items-center">
        <img src={isDarkSection ? LogoIconWhite : LogoIcon} alt="LogoIcon" /> 
        <span className={isDarkSection ? "text-white" : "text-[#1A1A1A]"}>우문현답</span>
      </Link>

      {/* 우측 네비게이션 (흰색 배경 적용) */}
      <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-full">
        <Link to="/guideline" className="text-[#1A1A1A] font-semibold">가이드라인</Link>
        <Link to="/chat-start" className="bg-[#A476CC] text-white px-4 py-2 rounded-full">시작하기</Link>
      </div>
    </header>
  );
};

export default Header;
