import axios from "axios";
import { useEffect, useState } from "react";

const ModelListModal = ({ isOpen, onModelSelect, currentModelId }) => {
    const [availableModelList, setAvailableModelList] = useState([]);
    
    // 모델 리스트 불러오기
    useEffect(() => {
        const fetchModelList = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_AI_URL + "/model/list");
                console.log(response.data);
                setAvailableModelList(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchModelList();
    }, [])

    if (!isOpen) return null;

    return (
        <div className="bg-[#FAFAFA] dark:bg-[#2E2C36] rounded-lg shadow-xl w-60 z-10">
            <h3 className="text-lg font-bold px-4 mb-2 dark:text-white">모델 선택</h3>
            <ul className="list-none p-0 m-0">
                {availableModelList.map(model => (
                    <li
                        key={model.id}
                        onClick={() => {
                            onModelSelect(model.id);
                        }}
                        className="py-2 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white flex items-center justify-between"
                    >
                        {model.name}
                        {currentModelId  === model.id && <span>&#10004;</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModelListModal;    