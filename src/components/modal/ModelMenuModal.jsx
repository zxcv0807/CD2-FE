import { useState } from "react";

const ModelMenuModal = ({ isOpen, onModelSelect, currentModel }) => {
    const [availableModels, setAvailableModels] = useState([
        "Model 1", "Model 2", "Model 3" // 실제 모델 목록으로 교체
    ]);
    
    if (!isOpen) return null;

    return (
        <div className="bg-[#FAFAFA] dark:bg-[#2E2C36] rounded-lg shadow-xl w-60 z-10">
            <h3 className="text-lg font-bold px-4 mb-2 dark:text-white">모델 선택</h3>
            <ul className="list-none p-0 m-0">
                {availableModels.map((model, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            onModelSelect(model);
                        }}
                        className="py-2 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white flex items-center justify-between"
                    >
                        {model}
                        {currentModel === model && <span>&#10004;</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModelMenuModal;    