const PrivacyModal = ({ onClose, onAgree }) => {
    // 모달창 닫기
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center z-50 transition-all duration-300" onClick={handleOverlayClick}>
            <div className="bg-white dark:bg-[#18171C] p-6 rounded-lg max-h-[600px] md:w-[600px] w-100 shadow-lg overflow-auto ">
                <h3 className="dark:text-white text-lg font-bold mb-4">개인정보 이용 동의</h3>
                <p className="dark:text-white text-sm mb-4">
                    <span className="font-semibold">우문현답(이하 "회사"라 한다)은 서비스 기획부터 종료까지 개인정보보호법 등 국내의 개인정보 보호 법령을 철저히 준수합니다.</span><br/>
                    <br/>
                    <span className="font-semibold">제 1 조. 개인정보의 수집 및 이용 목적</span><br/>
                    회사는 홈페이지에서 이용자의 상담 신청 시, 원할한 상담을 위해 필요한 최소한의 정보를 필수 사항으로 수집하고 있습니다.<br/>
                    <br/>
                    ① 회사는 이용자의 개인정보를 다음과 같이 수집합니다.<br/>
                    - 필수 정보 : 이름, 휴대폰번호<br/>
                    - 기타 : 유입경로, IP, 이용환경, 문의 내용<br/>
                    <br/>
                    ② 수집한 개인정보는 다음과 같은 목적으로 사용됩니다.<br/>
                    - 이름, 휴대폰번호 : 본인 식별 절차에 이용<br/>
                    - 서비스 이용 기록 : 맞춤형 서비스<br/>
                    <br/>
                    <br/>   
                    <span className="font-semibold">제 2 조. 개인정보의 보유 및 이용기간</span><br/>
                    회사는 인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 등의 이용자의 기본적 인권을 현저하게 침해할 우려가 있는 개인정보를 수집하지 않습니다.<br/>
                    <br/>
                    ① 내부 방침(부정이용기록)<br/>
                    - 보존 이유 : 기존 구매 상품에 대한 본인 인증 필요성<br/>
                    - 보존 기간 : 6개월<br/>
                    <br/>
                    ② 기타 이용자의 개별정인 동의가 있는 경우에는 개별 동의에 따른 기간까지 보관합니다.<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 3 조. 개인정보의 파기절차 및 방법</span><br/>
                    이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.<br/>
                    <br/>
                    ① 파기절차<br/>
                    - 이용자의 상담신청 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.<br/>
                    - 별도 DB로 옮겨진 개인정보는 법률에 의한 경우를 제외하고는 다른 목적으로 이용되지 않습니다.<br/>
                    <br/>
                    ② 파기방법<br/>
                    - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br/>
                    - 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 4 조. 개인정보의 처리위탁</span><br/>
                    회사는 위탁업무 계약서 등을 통해서 개인정보보호 관련 법규의 준수, 개인정보에 관한 비밀 유지, 제3자 제공에 대한 금지, 사고시의 책임 부담, 위탁기간, 처리 종료 후의 개인정보의 파기 의무 등을 규정하고, 이를 준수하도록 관리하고 있습니다.<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 5조. 이용자와 법정대리인의 권리와 그 행사방법</span><br/>
                    이용자는 언제든지 개인정보를 조회하고 수정할 수 있으며, 개인정보 제공 동의에 관한 철회를 요청할 수 있습니다.<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 6 조. 개인정보 자동수집 장치(쿠키 등)의 설치, 운영 및 그 거부에 관한 사항</span><br/>
                    회사는 보다 적절하고 유용한 서비스를 제공하기 위하여 이용자의 정보를 수시로 저장하고 불러오는 ‘쿠키(cookie)’를 사용합니다.<br/>
                    이용자는 사용하시는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 7 조. 개인정보보호책임자</span><br/>
                    이용자의 개인정보를 보호하고 개인정보와 관련된 불만 등을 처리하기 위하여 회사는 고객서비스담당 부서 및 개인정보보호책임자를 두고 있습니다.<br/>
                    [개인정보보호책임자]<br/>
                    - 성명 :
                    정승원<br/>
                    - 직위 :
                    팀장<br/>
                    - 연락처 :
                    010-4801-8517<br/>
                    <br/>
                    <br/>
                    <span className="font-semibold">제 8 조. 개인정보처리방침의 개정과 그 공지</span><br/>
                    현 개인정보처리방침이 추가 및 삭제, 수정이 있을 시에는 시행 7일 전에 홈페이지를 통해 사전 공지하며, 사전 공지가 곤란한 경우 지체 없이 공지할 수 있습니다. 이 정책은 아래 시행일자부터 시행됩니다.<br/>
                    <br/>
                    <br/>
                    시행일: 2025년 04월 29일<br/>
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="text-[#4E4E4E] dark:text-[#BBBBBB] hover:underline cursor-pointer"
                    >
                        닫기
                    </button>
                    <button
                        onClick={onAgree}
                        className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-600"
                    >
                        동의하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
