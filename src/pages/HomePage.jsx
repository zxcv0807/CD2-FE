import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import FirstSection from "../components/mainpage/FirstSection";
import SecondSection from "../components/mainpage/SecondSection";
import ThirdSection from "../components/mainpage/ThirdSection";
import FourthSection from "../components/mainpage/FourthSection";
import Footer from "../components/Footer";

const HomePage = () => {
  const fourthRef = useRef(null);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const target = fourthRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkSection(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    }
  }, []);

  return (
    <>
      {/* 헤더 */}
      <Header isDarkSection={isDarkSection}/>
      {/* 메인 */}
      <main className="min-h-screen flex flex-col items-center bg-white">
          {/* 첫 번째 섹션 */}
          <FirstSection />
          {/* 두 번째 섹션 */}
          <SecondSection />
          {/* 세 번째 섹션 */}
          <ThirdSection />
          {/* 네 번째 섹션 */}
          <FourthSection sectionRef={fourthRef} />
      </main>
      {/* 푸터 */}
      <Footer />
    </>
  );
};

export default HomePage;
