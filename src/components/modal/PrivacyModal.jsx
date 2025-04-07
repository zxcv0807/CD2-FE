const PrivacyModal = ({ onClose, onAgree }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center z-50 transition-all duration-300">
            <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg">
                <h3 className="text-lg font-bold mb-4">개인정보 이용 동의</h3>
                <p className="text-sm mb-4">
                    이 서비스는 회원 가입 및 서비스 제공을 위해 이메일 및 비밀번호 등의 정보를 수집합니다.
                    수집된 정보는 본 서비스 이외의 목적으로 사용되지 않습니다.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="text-[#4E4E4E] hover:underline"
                    >
                        닫기
                    </button>
                    <button
                        onClick={onAgree}
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                        동의하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
