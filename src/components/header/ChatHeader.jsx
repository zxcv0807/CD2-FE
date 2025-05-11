import React from "react";
 import { Link } from "react-router-dom";
 import { useDispatch } from "react-redux";
 import { logout } from "../../REDUX/auth/authSlice";
 import { useNavigate } from "react-router-dom";
 import NaviIcon2 from "../../assets/NaviIcon2.png";
 

 const ChatHeader = ({ onToggleSidebar }) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     // 로그아웃
     const handleLogout = () => {
         dispatch(logout());
         navigate("/login");
     }
     return (
         <>
             {/* 모바일 헤더 - 상단 고정 */}
             <div className="fixed top-0 left-0 right-0 z-100 h-16 flex justify-between items-center bg-white dark:bg-[#232129] p-4 md:hidden">
                 {/* 모바일에서만 햄버거 메뉴 표시 */}
                 <div className="flex gap-2 items-center">
                    <img 
                        src={NaviIcon2}
                        className="cursor-pointer" 
                        onClick={onToggleSidebar}
                    />
                    
                    {/* 로고 */}
                    <Link to="/" className="text-[#1A1A1A] dark:text-white font-semibold ml-4">
                        우문현답
                    </Link>
                </div>
                 
                 {/* 가이드라인/로그아웃 */}
                 <div className="flex gap-4">
                     <Link to="/guideline" className="text-[#1A1A1A] dark:text-white font-semibold hover:underline">가이드라인</Link>
                     <button onClick={handleLogout} className="text-[#999999] dark:text-[#BBBBBB] hover:underline cursor-pointer">로그아웃</button>
                 </div>
             </div>
             
             {/* 데스크톱 헤더 - 기존 위치 유지 */}
             <div className="fixed top-2 right-30 z-10 hidden md:flex gap-6 items-center">
                 <Link to="/guideline" className="text-[#1A1A1A] dark:text-white font-semibold hover:underline">가이드라인</Link>
                 <button onClick={handleLogout} className="text-[#999999] dark:text-[#BBBBBB] hover:underline cursor-pointer">로그아웃</button>
             </div>
         </>
     );
 };
 

 export default ChatHeader;