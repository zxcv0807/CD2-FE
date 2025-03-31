import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import FirstSection from "../components/mainpage/FirstSection";
import SecondSection from "../components/mainpage/SecondSection";
import ThirdSection from "../components/mainpage/ThirdSection";
import FourthSection from "../components/mainpage/FourthSection";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <>
      {/* 헤더 */}
      <Header />
      <main className="min-h-screen flex flex-col items-center bg-white">
          {/* 첫 번째 섹션 */}
          <FirstSection />
          {/* 두 번째 섹션 */}
          <SecondSection />
          {/* 세 번째 섹션 */}
          <ThirdSection />
          {/* 네 번째 섹션 */}
          <FourthSection />
      </main>
      {/* 푸터 */}
      <Footer />
    </>
  );
};

export default HomePage;
