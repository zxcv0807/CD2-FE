import { useEffect, useState } from "react"; 
import axios from "../../api/axiosInstance";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const token = useSelector((state) => state.auth.token);

  const [dailyVisitors, setDailyVisitors] = useState([
    { time: "00:00", count: 120 },
    { time: "06:00", count: 240 },
    { time: "12:00", count: 520 },
    { time: "18:00", count: 680 },
    { time: "21:00", count: 300 },
  ]);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const response = await axios.get("/api/v1/admin/stats/visits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("방문자 통계 불러오기 성공", response.data);
        const data = response.data.map(item => ({
          time: `${item.hour.toString().padStart(2, "0")}:00`,
          count: item.count,
        }));
        setDailyVisitors(data);
      } catch (err) {
        console.error("방문자 통계 불러오기 실패", err);
      }
    };

    fetchVisitorStats();
  }, [token]);

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* 사이드바 */}
      <AdminSidebar/>

      {/* 대쉬보드 */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Top Cards */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">활동 유저 수</p>
            <p className="text-xl font-bold text-gray-800">19명</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">총 방문자 수</p>
            <p className="text-xl font-bold text-gray-800">3,621명</p>
          </div>
        </div>

        {/* 방문자 수 차트 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">일간 방문자 수</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyVisitors}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
