import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="h-[200px] bg-[#1A1A1A] py-6 text-center flex flex-col justify-center items-center">
            {/* 제목 */}
            <Link to="/" className="text-lg text-white font-semibold mb-2">우문현답</Link>
            {/* 요소 */}
            <div className="flex justify-center gap-6 text-sm text-[#DADADA]">
                <Link to="/privacy" className="hover:text-white">개인정보처리방침</Link>
                <Link to="/termsofuse" className="hover:text-white">이용약관</Link>
            </div>
        </footer>
    );
};

export default Footer;
