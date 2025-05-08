import React from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {
  const dailyVisitors = [
    { time: "00:00", count: 120 },
    { time: "06:00", count: 240 },
    { time: "12:00", count: 520 },
    { time: "18:00", count: 680 },
    { time: "21:00", count: 300 },
  ];

  const weeklyVisitors = [
    { day: "월", count: 1800 },
    { day: "화", count: 2100 },
    { day: "수", count: 1950 },
    { day: "목", count: 2200 },
    { day: "금", count: 2500 },
    { day: "토", count: 2700 },
    { day: "일", count: 2300 },
  ];

  const monthlyVisitors = [
    { month: "1월", count: 15000 },
    { month: "2월", count: 16500 },
    { month: "3월", count: 18200 },
    { month: "4월", count: 20000 },
    { month: "5월", count: 21000 },
    { month: "6월", count: 15000 },
    { month: "7월", count: 16500 },
    { month: "8월", count: 18200 },
    { month: "9월", count: 20000 },
    { month: "10월", count: 21000 },
    { month: "11월", count: 15000 },
    { month: "12월", count: 16500 },
  ];

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
