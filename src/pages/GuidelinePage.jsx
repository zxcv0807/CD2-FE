import Header from "../components/header/Header";
import Footer from "../components/Footer";

const GuidelinePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="relative px-6 lg:px-16 py-10 mt-24">
        {/* 본문 내용 */}
        <div className="w-full lg:w-2/3 mx-auto">
          <h2 className="text-[#1A1A1A] text-3xl font-bold">우문현답 이용 가이드라인</h2>
          <p className="text-[#1A1A1A] mt-8">최종 수정일 <span className="text-[#4E4E4E]">2025-04-03</span></p>

          <hr className="my-6 border-[#DADADA]" />

          {/* 섹션 1 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">섹션 제목</h2>
            <p className="text-[#4E4E4E] mt-4">
              섹션 텍스트를 다양한 예시로 채워넣습니다. 섹션 텍스트를 입력해 주세요.
              섹션 텍스트를 입력해 주세요. 섹션 텍스트를 입력해 주세요.
            </p>

            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>이런거 필요하면 만들어 쓰세요</p>
              <p>이런거 필요하면 만들어 쓰세요</p>
            </div>

            <div className="bg-[#D9D9D9] w-full h-[500px] rounded-lg mt-6 flex items-center justify-center text-[#4E4E4E]">
              이미지<br />
              width: 100%<br />
              height: auto<br />
              border-radius: 8px
            </div>
          </section>

          {/* 섹션 2 */}
          <section className="mt-24">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">섹션 제목</h2>
            <p className="text-[#4E4E4E] mt-4">
              섹션 텍스트를 다양한 예시로 채워넣습니다. 섹션 텍스트를 입력해 주세요.
              섹션 텍스트를 입력해 주세요. 섹션 텍스트를 입력해 주세요.
            </p>

            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>이런거 필요하면 만들어 쓰세요</p>
              <p>이런거 필요하면 만들어 쓰세요</p>
            </div>

            <div className="bg-[#D9D9D9] w-full h-[500px] rounded-lg mt-6 flex items-center justify-center text-[#4E4E4E]">
              이미지<br />
              width: 100%<br />
              height: auto<br />
              border-radius: 8px
            </div>
          </section>
        </div>

        {/* 오른쪽 목차 (절대 위치) */}
        <aside className="hidden lg:block absolute top-20 right-16 w-52">
          <div className="fixed top-64 bg-[#F5F5F5] p-6 rounded-lg text-sm w-[250px]">
            <h3 className="text-[#1A1A1A] text-base font-semibold">가이드라인 목차</h3>
            <ul className="mt-4 space-y-2 text-[#4E4E4E]">
              <li>섹션 제목</li>
              <li className="text-[#1A1A1A] font-semibold">현재 섹션 제목 강조</li>
              <li>섹션 제목</li>
              <li>섹션 제목</li>
              <li>섹션 제목</li>
              <li>섹션 제목</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default GuidelinePage;
