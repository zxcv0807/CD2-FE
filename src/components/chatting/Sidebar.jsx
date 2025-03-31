import { Link } from "react-router-dom";
import LogoIcon from "../../assets/LogoIcon.png";

const Sidebar = () => {
    return (
      <aside className="w-[500px] h-screen flex">
        {/* 왼쪽 네비게이션 영역 */}
        <div className="w-[80px] bg-[#A476CC] flex flex-col items-center pt-8 text-white rounded-2xl">
            {/* 로고 */}
            <Link to="/" className="mb-8 text-lg font-semibold flex flex-col items-center justify-center">
                <img src={LogoIcon} alt="logo" className="w-[24px] h-[24px]"/>
                우문현답
            </Link>
    
            {/* 네비게이션 아이콘 리스트 */}
            <nav className="flex flex-col items-center gap-6">
                <div className="text-xl cursor-pointer">📖</div>
                <div className="text-xl cursor-pointer">📝</div>
                <div className="text-xl cursor-pointer">🔍</div>
            </nav>
        </div>
  
        {/* 오른쪽 채팅 리스트 영역 */}
        <div className="flex-1 bg-white text-black rounded-tl-2xl px-6 py-4">
          {/* 상단 헤더 */}
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Message</h2>
            <button className="w-10 h-10 bg-[#A476CC] text-white text-xl rounded-full flex justify-center items-center">
              +
            </button>
          </header>
  
          {/* 채팅 목록 */}
          <ul className="flex flex-col gap-2">
            {Array(6).fill(0).map((_, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer">
                <p className="font-semibold">프롬프트 제목</p>
                <p className="text-gray-500 text-sm">주제</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  