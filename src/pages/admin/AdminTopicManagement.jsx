import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminTopicManagement = () => {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState("");

    // 주제 목록 불러오기
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get("/api/v1/topics/");
                console.log("주제 요청 성공", response.data);
                setTopics(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTopics();
    }, []);

    // 주제 추가
    const handleAddTopic = async () => {
        if (newTopic.trim() && !topics.includes(newTopic)) {
            try{
                const response = await axios.post("/api/v1/admin/topics",
                    { topic_name: newTopic}, 
                );
                const createdTopic = response.data;
                setTopics([...topics, createdTopic]);
                setNewTopic("");
            } catch (err) {
                console.error("주제 추가 실패", err);
            }
        }
    };

    // 주제 삭제
    const handleDeleteTopic = async (topic_id) => {
        try {
            const response = await axios.delete(`/api/v1/admin/topics/${topic_id}`);
            console.log("주제 삭제 성공", response.data);
            setTopics(topics.filter((topic) => topic.topic_id !== topic_id));

        } catch (err) {
            console.error("주제 삭제 실패", err);
        }
    };

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <AdminSidebar/>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">주제 관리</h2>
                {/* 주제 추가 섹션 */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="새 주제를 입력하세요"
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded shadow-sm"
                    />
                    <button
                        onClick={handleAddTopic}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        추가
                    </button>
                </div>
                {/* 주제 목록 */}
                <ul className="space-y-2">
                    {topics.map((topic) => (
                    <li
                        key={topic.topic_id}
                        className="flex justify-between items-center p-4 bg-white rounded shadow"
                    >
                        <span>{topic.topic_name}</span>
                        <button
                            onClick={() => handleDeleteTopic(topic.topic_id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-500"
                        >
                        삭제
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminTopicManagement;
