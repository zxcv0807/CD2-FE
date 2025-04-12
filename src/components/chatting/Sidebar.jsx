import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatListVisible } from "../../REDUX/layout/chatListLayoutSlice";
import MenuPortal from "./MenuPortal";
import SidebarToolTip from "../modal/SidebarToolTip";
import LogoIconWhite from "../../assets/LogoIconWhite.png";
import PenIcon from "../../assets/PenIcon.png";
import NaviIcon from "../../assets/NaviIcon.png";
import SearchIcon from "../../assets/SearchIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";
import PlusIcon from "../../assets/PlusIcon.png";
import PencilIcon from "../../assets/PencilIcon.png";
import TrashCanIcon from "../../assets/TrashCanIcon.png";

const Sidebar = () => {
  // 사이드바 열고 닫기
  const dispatch = useDispatch();
  const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);
  const handleToggleChatList = () => {
    dispatch(toggleChatListVisible());
  };

  //메뉴 열고 닫기
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0});
  const toggleMenu = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.right + 10, y: rect.top });
    setOpenMenuId(prev => (prev === id ? null : id));
  }
  
  // 채팅 목록
  const [editChatId, setEditChatId] = useState(null);
  const [chatList, setChatList] = useState([
    { id: 1, title: "프롬프트 제목", topic: "주제" },
    { id: 2, title: "프롬프트 제목", topic: "주제" },
    { id: 3, title: "프롬프트 제목", topic: "주제" },
    { id: 4, title: "프롬프트 제목", topic: "주제" },
    { id: 5, title: "프롬프트 제목", topic: "주제" },
  ]);

  // 채팅 선택
  const handleChatClick = (chatId) => {
    console.log(`채팅 ${chatId}이 선택됨`);
  }

  // 채팅 목록 중 선택하기
  const handleSelectChat = (chatId) => {
    console.log(`${chatId} 번째 채팅 선택`)
    setEditChatId(chatId);
    setOpenMenuId(null);
  }
  // 제목 바꾸기
  const handleTitleChange = (chatId, newTitle) => {
    setChatList(prev =>
      prev.map(chat =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
    setEditChatId(null); // 편집 종료
  }
  // 채팅 삭제
  const handleDeleteChatting = (chatId) => {
    console.log(`${chatId} 번째 채팅 삭제하기`);
  }
  
  // 메뉴 밖을 눌렀을 때 메뉴 창 끄기기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-portal")) {
        setOpenMenuId(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <aside className="h-screen flex">
      {/* 👉 왼쪽 네비게이션 영역 (고정 80px) */}
      <div className="w-[80px] bg-[#A476CC] flex flex-col items-center pt-8 text-white rounded-2xl">
        {/* 로고 */}
        <Link to="/" className="mb-8 text-lg font-semibold flex flex-col items-center justify-center">
          <img src={LogoIconWhite} alt="logo" className="w-[24px] h-[24px]" />
          <span className="mt-1 text-sm">우문현답</span>
        </Link>

        {/* 구분선 */}
        <div className="w-3/5 h-px bg-white mb-6" />

        {/* 네비게이션 아이콘 리스트 */}
        <div className="flex flex-col justify-between h-full items-center py-8">
          <nav className="flex flex-col items-center gap-12">
            {/* 사이드바 열고 닫기 */}
            <div className="relative group">
              <img src={NaviIcon} onClick={handleToggleChatList} className="cursor-pointer" />
              <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
                <SidebarToolTip text={isChatListVisible ? "사이드바 닫기" : "사이드바 열기"} />
              </div>
            </div>
            {/* 새 채팅 */}
            <Link to="/chat-start" className="relative group">
              <img src={PenIcon} className="cursor-pointer" />
              <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
                <SidebarToolTip text="새 채팅" />
              </div>
            </Link>
            {/* 채팅 검색 */}
            <div className="relative group">
              <img src={SearchIcon}/>
              <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
                <SidebarToolTip text="채팅 검색" />
              </div>
            </div>
          </nav>
          {/* 설정 아이콘 */}
          <div className="relative group">
            <img src={SettingsIcon} />
            <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
              <SidebarToolTip text="설정" />
            </div>
          </div>
        </div>
      </div>

      {/* 👉 오른쪽 채팅리스트 영역 */}
      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${isChatListVisible ? "w-[400px]" : "w-0"}
        `}
      >
        <div className="w-[400px] h-full px-6 py-4">
          {/* 상단 헤더 */}
          <header className="flex justify-between items-center my-8">
            <h2 className="text-[#1A1A1A] text-3xl font-semibold">Message</h2>
            {/* 새 채팅 */}
            <Link to="/chat-start" className="relative group">
              <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center cursor-pointer">
                <img src={PlusIcon} />
              </button>
            </Link>
          </header>

          {/* 채팅 목록 */}
          <ul className="flex flex-col divide-y divide-[#DADADA]">
            {chatList.map((chat) => (
              <li
                key={chat.id}
                className="flex justify-between items-center px-4 py-3 mb-4 hover:bg-[#F5F5F5] relative"
                onClick={() => handleChatClick(chat.id)}
              >
                <div>
                  {editChatId === chat.id ? (
                    <input
                      type="text"
                      className="text-[#1A1A1A] font-semibold border-b border-[#999999] bg-transparent outline-none"
                      autoFocus
                      defaultValue={chat.title}
                      onBlur={(e) => handleTitleChange(chat.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleTitleChange(chat.id, e.target.value);
                        }
                      }}
                    />
                  ) : (
                    <p className="text-[#1A1A1A] font-semibold max-w-[240px] truncate">
                      {chat.title}
                    </p>
                  )}
                  
                  <p className="mt-1 text-[#4E4E4E] text-sm">{chat.topic}</p>
                </div>
              
                {/* ⋯ 버튼과 메뉴를 감싸는 박스 */}
                <div className="relative">
                  <div
                    className="text-[#C3C3C3] text-xl cursor-pointer px-2"
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 막기
                      toggleMenu(chat.id, e)}
                    }
                  >
                    ⋯
                  </div>
              
                  {/* 제목 바꾸기, 채팅 삭제 */}
                  {openMenuId === chat.id && (
                    <MenuPortal>
                      <div 
                        className="menu-portal absolute z-50 bg-[#F5F5F5] rounded-md shadow-md w-[140px]"
                        style={{
                          position: 'absolute',
                          top: `${menuPosition.y}px`,
                          left: `${menuPosition.x}px`,
                        }}
                      >
                        <button 
                          className="w-full px-4 py-2 flex items-center gap-2" 
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트 버블링 막기
                            handleSelectChat(chat.id);
                          }}
                        >
                          <img src={PencilIcon} className="cursor-pointer"/>
                          <span className="text-[#4E4E4E] text-sm hover:underline cursor-pointer">이름 바꾸기</span>
                        </button>
                        <button 
                          className="w-full px-4 py-2  flex items-center gap-3" 
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트 버블링 막기
                            handleDeleteChatting(chat.id);
                          }}
                        >
                          <img src={TrashCanIcon} className="cursor-pointer"/>
                          <span className="text-[#ED4545] text-sm hover:underline cursor-pointer">채팅 삭제</span>
                        </button>
                      </div>
                    </MenuPortal>
                  )}
                </div>
              </li>            
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;