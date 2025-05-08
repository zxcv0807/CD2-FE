import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <div className="text-xl font-bold mb-4">관리자 페이지</div>
            <nav className="space-y-2">
            <Link to="/admin" className="block p-2 rounded hover:bg-[#DADADA]">Dashboard</Link>
            <Link to="/admin/topic" className="block p-2 rounded hover:bg-[#DADADA]">주제 관리</Link>
            <Link to="/admin/language" className="block p-2 rounded hover:bg-[#DADADA]">언어 관리</Link>
            </nav>
      </aside>
    );
};

export default AdminSidebar;