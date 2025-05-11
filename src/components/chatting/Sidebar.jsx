import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatListVisible } from "../../REDUX/layout/chatListLayoutSlice";
import axios from "../../api/axiosInstance";
import MenuPortal from "./MenuPortal";
import SidebarToolTip from "../modal/SidebarToolTip";
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


const Sidebar = ({ isSidebarVisible }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isChatListVisible = useSelector((state) => state.chatListLayout.isChatListVisible);

  // 선택된 세션
  const currentSessionId = location.pathname.split("/chatting/")[1];

  // 사이드바 열고 닫기
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
  const [editSessionId, setEditSessionId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  // 대화 세션 전체 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/sessions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("채팅 목록 불러오기 성공", response.data);
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
  const navigate = useNavigate();
  const handleChatClick = (sessionId) => {
    navigate(`/chatting/${sessionId}`)
  }

  // 채팅 목록 중 선택하기
  const handleSelectChat = (sessionId) => {
    console.log(`${sessionId} 번째 채팅 선택`)
    setEditSessionId(sessionId);
    setOpenMenuId(null);
  }
  // 제목 바꾸기
  const handleTitleChange = async (sessionId, newTitle) => {
    // 기존 제목 저장
    const oldTitle = chatList.find(chat => chat.session_id === sessionId)?.session_title;
    try {
      const response = await axios.put(`/api/v1/sessions/${sessionId}`,
        {title: newTitle},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("제목 변경 성공", response.data);
      console.log(`채팅 ${sessionId} 제목이 ${newTitle}로 변경됨`);
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
  }
  // 채팅 삭제
  const handleDeleteChatting = async (sessionId) => {
    console.log(`${sessionId} 번째 채팅 삭제하기`);
    try {
      await axios.delete(`/api/v1/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // UI 상으로는 즉시 반영되도록
      setChatList(prev => prev.filter(chat => chat.session_id !== sessionId));
      // 현재 보고 있는 대화 세션을 삭제하면 새 채팅 페이지로 이동동
      if (sessionId.toString() === currentSessionId) {
        navigate("/chat-start");
      }
    } catch (err) {
      console.error(err);
    }
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

  // 채팅 검색 모달
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const handleOpenChatSearch = () => {
    setIsChatSearchOpen(true);
  }
  const handleCloseChatSearch = () => {
    setIsChatSearchOpen(false);
  }

  // 설정 모달
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const handleOpenSetting = () => {
    setIsSettingOpen(true);
  }
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  }
  
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
              <Link to="/chat-start" className="relative group">
                <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center cursor-pointer">
                  <img src={PlusIcon} />
                </button>
              </Link>
            </header>

            {/* 채팅 목록 */}
            <div className="flex-grow overflow-auto px-4">
              {loading && <span className="text-[#1A1A1A] dark:text-white">로딩 중...</span>}
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
            <div className="bg-[#A476CC] flex justify-center items-center gap-8 px-6 py-4 mt-2 ">
              {/* 새 채팅 */}
              <Link to="/chat-start" className="p-2">
                <img src={PenIcon} alt="새 채팅" />

              </Link>
              {/* 채팅 검색 */}
              <div onClick={handleOpenChatSearch} className="p-2">
                <img src={SearchIcon} alt="검색" />
              </div>
              {/* 설정 */}
              <div onClick={handleOpenSetting} className="p-2">
                <img src={SettingsIcon} alt="설정" />
              </div>
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
                <img src={SearchIcon} onClick={handleOpenChatSearch} className="cursor-pointer"/>
                <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
                  <SidebarToolTip text="채팅 검색" />
                </div>
              </div>
            </nav>
            {/* 설정 아이콘 */}
            <div className="relative group">
              <img src={SettingsIcon} onClick={handleOpenSetting} className="cursor-pointer"/>
              <div className="hidden group-hover:block absolute top-1/2 left-full -translate-y-1/2 ml-2 z-50">
                <SidebarToolTip text="설정" />
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 채팅리스트 영역 */}
        <div className={`transition-all duration-300 overflow-hidden ${isChatListVisible ? "w-[350px]" : "w-0"}`}>
          <div className="w-[350px] h-full px-6 py-4 bg-white dark:bg-[#232129] flex flex-col">
            {/* 상단 헤더 */}
            <header className="flex justify-between items-center my-8">
              <h2 className="text-[#1A1A1A] dark:text-white text-3xl font-semibold">Message</h2>
              {/* 새 채팅 */}
              <Link to="/chat-start" className="relative group">
                <button className="w-[50px] h-[50px] bg-[#A476CC] rounded-full flex justify-center items-center cursor-pointer">
                  <img src={PlusIcon} />
                </button>
              </Link>
            </header>

            {/* 채팅 목록 */}
            <div className="flex-grow overflow-y-auto">
              {loading && <span className="text-[#1A1A1A] dark:text-white">로딩 중...</span>}
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