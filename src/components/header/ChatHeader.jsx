import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../REDUX/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그아웃
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }
    return (
        <div className="fixed top-2 right-30 z-10 flex gap-6">
            <Link to="/guideline" className="text-[#1A1A1A] dark:text-white font-semibold hover:underline">가이드라인</Link>
            <button onClick={handleLogout} className="text-[#999999] dark:text-[#BBBBBB] hover:underline cursor-pointer">로그아웃</button>
        </div>
    );
};

export default ChatHeader;
