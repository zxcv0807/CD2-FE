import { Link } from "react-router-dom";
import LogoIcon from "../../assets/LogoIcon.png";
import LogoIconWhite from "../../assets/LogoIconWhite.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center md:px-12 px-6 py-4 md:bg-transparent bg-white z-500">
      {/* 좌측 로고 */}
      <div className="bg-white dark:bg-[#18171C] rounded-full p-0 md:py-2 md:px-4">
        <Link to="/" className="text-lg font-semibold flex gap-2 items-center">
          <img src={LogoIcon} alt="LogoIcon" className="block dark:hidden"/> 
          <img src={LogoIconWhite} className="hidden dark:block" />
          <span className="text-[#1A1A1A] dark:text-white">우문현답</span>
        </Link>
      </div>

      {/* 우측 네비게이션 (흰색 배경 적용) */}
      <div className="flex items-center space-x-4 bg-white dark:bg-[#18171C] p-0 md:px-4 md:py-2 rounded-full">
        <Link to="/guideline" className="text-[#1A1A1A] dark:text-white font-semibold">가이드라인</Link>
        <Link to="/topics" className="bg-[#A476CC] text-white font-semibold px-4 py-2 rounded-full">시작하기</Link>
      </div>
    </header>
  );
};

export default Header;