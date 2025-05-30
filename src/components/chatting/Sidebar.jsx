import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatListVisible } from "../../REDUX/layout/chatListLayoutSlice";
import axios from "../../api/axiosInstance";
import Tooltip from "../modal/Tooltip";
import LogoIconWhite from "../../assets/LogoIconWhite.png";
import PenIcon from "../../assets/PenIcon.png";
import NaviIcon from "../../assets/NaviIcon.png";
import SearchIcon from "../../assets/SearchIcon.png";
import SettingsIcon from "../../assets/SettingsIcon.png";
import PlusIcon from "../../assets/PlusIcon.png";
import PencilIcon from "../../assets/PencilIcon.png";
import TrashCanIcon from "../../assets/TrashcanIcon.png";
import ChatSearch from "../modal/ChatSearch";
import Setting from "../modal/Setting";
import MenuPortal from "../modal/MenuPortal";

const Sidebar = ({ isSidebarVisible }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);
  const token = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentSessionId = location.pathname.split("/chatting/")[1]; // 선택된 세션
  const [openMenuId, setOpenMenuId] = useState(null); 
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0});
  const [editSessionId, setEditSessionId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // 사이드바 열고 닫기
  const handleToggleChatList = () => {
    dispatch(toggleChatListVisible());
  };

  //메뉴 열고 닫기
  const toggleMenu = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.right + 10, y: rect.top });
    setOpenMenuId(prev => (prev === id ? null : id));
  };
  
  // 대화 세션 전체 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/sessions/");
        const chatData = response.data
          .sort((a, b) => new Date(b.modify_at) - new Date(a.modify_at))
          .map(session => ({
          session_id: session.session_id,
          session_title: session.title,
          topicId: session.topics[0].topic_id,
          topic: session.topics[0].topic_name,
        }));
        setChatList(chatData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchChatList();
  }, [token]);

  // 채팅 선택
  const handleChatClick = (sessionId) => {
    navigate(`/chatting/${sessionId}`)
  };

  // 채팅 목록 중 선택하기
  const handleSelectChat = (sessionId) => {
    setEditSessionId(sessionId);
    setOpenMenuId(null);
  };
  // 제목 바꾸기
  const handleTitleChange = async (sessionId, newTitle) => {
    // 기존 제목 저장
    const oldTitle = chatList.find(chat => chat.session_id === sessionId)?.session_title;
    try {
      await axios.put(`/api/v1/sessions/${sessionId}`,
        {title: newTitle},
      );
      // UI 상으로는 즉시 반영되도록
      setChatList(prev =>
        prev.map(chat =>
          chat.session_id === sessionId ? { ...chat, session_title: newTitle } : chat
        )
      );
    } catch (err) {
      console.err("제목 수정 실패", err);
      // 실패 시 이전 제목으로 되돌리는 로직
      setChatList(prev =>
        prev.map(chat =>
          chat.session_id === sessionId ? { ...chat, session_title: oldTitle } : chat
        )
      );
    } finally {
      setEditSessionId(null); // 편집 종료
    }
  };
  // 채팅 삭제
  const handleDeleteChatting = async (sessionId) => {
    try {
      await axios.delete(`/api/v1/sessions/${sessionId}`);
      // UI 상으로는 즉시 반영되도록
      setChatList(prev => prev.filter(chat => chat.session_id !== sessionId));
      // 현재 보고 있는 대화 세션을 삭제하면 새 채팅 페이지로 이동
      if (sessionId.toString() === currentSessionId) {
        navigate("/topics");
      }
    } catch (err) {
      console.error(err);
    }
  };
  
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

  // 채팅 검색 모달
  const handleOpenChatSearch = () => {
    setIsChatSearchOpen(true);
  };
  const handleCloseChatSearch = () => {
    setIsChatSearchOpen(false);
  };
  // 설정 모달
  const handleOpenSetting = () => {
    setIsSettingOpen(true);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };
  
  return (
    <>
      {/* 모바일 환경 */}
       <aside className={`h-screen flex md:hidden fixed z-50 transform transition-transform duration-300 ${!isSidebarVisible ? "-translate-x-full" : ""}`}>
        {/* 오른쪽 채팅리스트 영역 - 모바일에서는 항상 표시 */}
        <div className="w-[400px] h-full px-6 py-4 bg-white dark:bg-[#232129] flex flex-col">
            {/* 상단 헤더 */}
            <header className="flex justify-between items-center px-6 py-4 mt-10">
              <h2 className="text-[#1A1A1A] dark:text-white text-3xl font-semibold">Message</h2>
              {/* 새 채팅 */}
              <Link to="/topics" className="relative group">
                <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center cursor-pointer">
                  <img src={PlusIcon} />
                </button>
              </Link>
            </header>

            {/* 채팅 목록 */}
            <div className="flex-grow overflow-auto px-4">
              {loading && <span className="text-[#1A1A1A] dark:text-white">로딩 중...</span>}
              {!isLoggedIn && <span><Link to="/login" className="text-[#A476CC] hover:text-[#6A4B85] dark:hover:text-[#C0A3E6]">로그인</Link> 이후에 더 많은 기능을 사용해보세요.</span>}
              <ul className="flex flex-col divide-y divide-[#999999] dark:divide-[#BBBBBB]">
                {chatList.map((chat) => (
                  <li
                    key={chat.session_id}
                    className={`flex justify-between items-center px-4 py-3 mb-4 rounded-xl hover:bg-[#E7E7E7] dark:hover:bg-[#4E4E4E] relative ${currentSessionId === chat.session_id.toString() ? "bg-[#DADADA] dark:bg-[#393646]" : ""}`}
                    onClick={() => handleChatClick(chat.session_id)}
                  >
                    <div>
                      {editSessionId === chat.session_id ? (
                        <input
                          type="text"
                          className="text-[#1A1A1A] dark:text-white font-semibold border-b border-[#999999] dark:border-[#FAFAFA] bg-transparent outline-none"
                          autoFocus
                          defaultValue={chat.session_title}
                          onBlur={(e) => handleTitleChange(chat.session_id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleTitleChange(chat.session_id, e.target.value);
                            }
                          }}
                        />
                      ) : (
                        // 대화 세션 제목
                        <p className="text-[#1A1A1A] dark:text-white font-semibold max-w-[200px] truncate">
                          {chat.session_title}
                        </p>
                      )}
                      
                      <p className="mt-1 text-[#4E4E4E] dark:text-[#BBBBBB] text-sm">{chat.topic}</p>
                    </div>
                  
                    {/* ⋯ 버튼과 메뉴를 감싸는 박스 */}
                    <div className="relative">
                      <div
                        className="text-[#C3C3C3] dark:text-[#888888] text-xl cursor-pointer px-2"
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 버블링 막기
                          toggleMenu(chat.session_id, e)}
                        }
                      >
                        ⋯
                      </div>
                  
                      {/* 제목 바꾸기, 채팅 삭제 */}
                      {openMenuId === chat.session_id && (
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
                                handleSelectChat(chat.session_id);
                              }}
                            >
                              <img src={PencilIcon} className="cursor-pointer"/>
                              <span className="text-[#4E4E4E] text-sm hover:underline cursor-pointer">이름 바꾸기</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 flex items-center gap-3" 
                              onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 버블링 막기
                                handleDeleteChatting(chat.session_id);
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
            <div className="bg-[#A476CC] flex justify-center items-center gap-8 px-6 py-4 mt-2 rounded-lg">
              {/* 새 채팅 */}
              <Link to="/topics" className="p-2">
                <img src={PenIcon} alt="새 채팅" />

              </Link>
              {/* 채팅 검색 */}
              <img src={SearchIcon} onClick={isLoggedIn ? handleOpenChatSearch : () => {}} className={`p-2 ${isLoggedIn ? "" : "opacity-50"}`}/>
              {/* 설정 */}
              <img src={SettingsIcon} onClick={isLoggedIn ? handleOpenSetting : () => {}} className={`p-2 ${isLoggedIn ? "" : "opacity-50"}`} />
            </div>
          </div>
      </aside>

      {/* 데스크톱 환경 */}
      <aside className="h-screen md:flex hidden">
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
              <Tooltip text={isChatListVisible ? "사이드바 닫기" : "사이드바 열기"} position="right">
                <div className="relative group">
                  <img src={NaviIcon} onClick={handleToggleChatList} className="cursor-pointer" />
                </div>
              </Tooltip>
              {/* 새 채팅 */}
              <Tooltip text="새 채팅" position="right">
                <Link to="/topics" className="relative group">
                  <img src={PenIcon} className="cursor-pointer" />
                </Link>
              </Tooltip>
              {/* 채팅 검색 */}
              <Tooltip text={`${isLoggedIn ? "채팅 검색" : "로그인 후 사용가능합니다."}`} position="right">
                <div className="relative group">
                  <img src={SearchIcon} onClick={isLoggedIn ? handleOpenChatSearch : () => {}} className={`cursor-pointer ${isLoggedIn ? "" : "opacity-50"}`}/>
                </div>
              </Tooltip>
            </nav>
            {/* 설정 아이콘 */}
            <Tooltip text={`${isLoggedIn ? "설정" : "로그인 후 사용가능합니다."}`} position="right">
              <div className="relative group">
                <img src={SettingsIcon} onClick={isLoggedIn ? handleOpenSetting : () => {}} className={`cursor-pointer ${isLoggedIn ? "" : "opacity-50"}`}/>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* 오른쪽 채팅리스트 영역 */}
        <div className={`transition-all duration-300 overflow-hidden ${isChatListVisible ? "w-[350px]" : "w-0"}`}>
          <div className="w-[350px] h-full px-6 py-4 bg-white dark:bg-[#232129] flex flex-col">
            {/* 상단 헤더 */}
            <header className="flex justify-between items-center my-8">
              <h2 className="text-[#1A1A1A] dark:text-white text-3xl font-semibold">Message</h2>
              {/* 새 채팅 */}
              <Link to="/topics" className="relative group">
                <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center cursor-pointer">
                  <img src={PlusIcon} />
                </button>
              </Link>
            </header>

            {/* 채팅 목록 */}
            <div className="flex-grow overflow-y-auto">
              {loading && <span className="text-[#1A1A1A] dark:text-white">로딩 중...</span>}
              {!isLoggedIn && <span><Link to="/login" className="text-[#A476CC] hover:text-[#6A4B85] dark:hover:text-[#C0A3E6]">로그인</Link> 이후에 더 많은 기능을 사용해보세요.</span>}
              <ul className="flex flex-col divide-y divide-[#999999] dark:divide-[#BBBBBB]">
                {chatList.map((chat) => (
                  <li
                    key={chat.session_id}
                    className={`flex justify-between items-center px-4 py-3 mb-4 rounded-xl hover:bg-[#E7E7E7] dark:hover:bg-[#4E4E4E] relative ${currentSessionId === chat.session_id.toString() ? "bg-[#DADADA] dark:bg-[#393646]" : ""}`}
                    onClick={() => handleChatClick(chat.session_id)}
                  >
                    <div>
                      {editSessionId === chat.session_id ? (
                        <input
                          type="text"
                          className="text-[#1A1A1A] dark:text-white font-semibold border-b border-[#999999] dark:border-[#FAFAFA] bg-transparent outline-none"
                          autoFocus
                          defaultValue={chat.session_title}
                          onBlur={(e) => handleTitleChange(chat.session_id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleTitleChange(chat.session_id, e.target.value);
                            }
                          }}
                        />
                      ) : (
                        // 대화 세션 제목
                        <p className="text-[#1A1A1A] dark:text-white font-semibold max-w-[200px] truncate">
                          {chat.session_title}
                        </p>
                      )}
                      
                      <p className="mt-1 text-[#4E4E4E] dark:text-[#BBBBBB] text-sm">{chat.topic}</p>
                    </div>
                  
                    {/* ⋯ 버튼과 메뉴를 감싸는 박스 */}
                    <div className="relative">
                      <div
                        className="text-[#C3C3C3] dark:text-[#888888] text-xl cursor-pointer px-2"
                        onClick={(e) => {
                          e.stopPropagation(); // 클릭 이벤트 버블링 막기
                          toggleMenu(chat.session_id, e)}
                        }
                      >
                        ⋯
                      </div>
                  
                      {/* 제목 바꾸기, 채팅 삭제 */}
                      {openMenuId === chat.session_id && (
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
                                handleSelectChat(chat.session_id);
                              }}
                            >
                              <img src={PencilIcon} className="cursor-pointer"/>
                              <span className="text-[#4E4E4E] text-sm hover:underline cursor-pointer">이름 바꾸기</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 flex items-center gap-3" 
                              onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 버블링 막기
                                handleDeleteChatting(chat.session_id);
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
        </div>
      </aside>

      {isChatSearchOpen && (
        <ChatSearch onClose={handleCloseChatSearch} />
      )}
      {isSettingOpen && (
        <Setting onClose={handleCloseSetting} />
      )}
    </>
  );
};

export default Sidebar;