import { Link } from "react-router-dom";
import LogoIconWhite from "../../assets/LogoIconWhite.png";
import PenIcon from "../../assets/PenIcon.png";
import NaviIcon from "../../assets/NaviIcon.png";
import SearchIcon from "../../assets/SearchIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";
import PlusIcon from "../../assets/PlusIcon.png";

const Sidebar = () => {
    return (
      <aside className="w-[500px] h-screen flex">
        {/* 왼쪽 네비게이션 영역 */}
        <div className="w-[80px] bg-[#A476CC] flex flex-col items-center pt-8 text-white rounded-2xl">
            {/* 로고 */}
            <Link to="/" className="mb-8 text-lg font-semibold flex flex-col items-center justify-center">
                <img src={LogoIconWhite} alt="logo" className="w-[24px] h-[24px]"/>
                <span className="mt-1 text-sm">우문현답</span>
            </Link>
            {/* 구분선 */}
            <div className="w-3/5 h-px bg-white mb-10" />
    
            {/* 네비게이션 아이콘 리스트 */}
            <div className="flex flex-col justify-between h-full items-center py-8">
              <nav className="flex flex-col items-center gap-12">
                  <img src={NaviIcon} />
                  <img src={PenIcon} />
                  <img src={SearchIcon} />
              </nav>
              <img src={SettingsIcon} />
            </div>
        </div>
  
        {/* 오른쪽 채팅 리스트 영역 */}
        <div className="flex-1 bg-white text-black rounded-tl-2xl px-6 py-4">
          {/* 상단 헤더 */}
          <header className="flex justify-between items-center my-8">
            <h2 className="text-[#1A1A1A]   text-3xl font-semibold">Message</h2>
            <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center">
              <img src={PlusIcon} />
            </button>
          </header>

          {/* 채팅 목록 */}
          <ul className="flex flex-col divide-y divide-[#DADADA]">
            {Array(6).fill(0).map((_, index) => (
              <li
                key={index}
                className={`
                  flex justify-between items-center px-4 py-3 mb-4
                  ${index === 2 ? "bg-white shadow-md rounded-xl" : ""}
                  hover:bg-gray-50 cursor-pointer
                `}
              >
                {/* 텍스트 영역 */}
                <div>
                  <p className="font-semibold">프롬프트 제목</p>
                  <p className="text-gray-500 text-sm">주제</p>
                </div>
                
                <div className="text-[#C3C3C3] text-xl">⋯</div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  