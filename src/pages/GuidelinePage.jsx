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
          <p className="text-[#1A1A1A] mt-8">최종 수정일 <span className="text-[#4E4E4E]">2025-05-01</span></p>

          <hr className="my-6 border-[#DADADA]" />

          {/* 섹션 1 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">1. AI에게 역할을 부여하세요</h2>
            <p className="text-[#4E4E4E] mt-4">
              ChatGPT는 다양한 역할을 수행할 수 있습니다. 원하는 결과를 얻으려면 AI에게 명확한 역할을 지정하세요. 역할을 정하면 그에 맞는 어투, 정보, 전문성을 갖춘 답변을 받을 수 있습니다.  
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“당신은 숙련된 이력서 작성 컨설턴트입니다. 내 경력 정보를 바탕으로 이력서를 작성해 주세요.”</p>
              <p>“당신은 친절한 어린이 동화 작가입니다. 7살 아이가 이해할 수 있도록 이야기를 써 주세요.”</p>
            </div>
          </section>
          {/* 섹션 2 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">2. 명확하고 설명적이며 정확한 과제를 부여하세요</h2>
            <p className="text-[#4E4E4E] mt-4">
              AI에게 요청할 작업을 구체적으로, 상세하게, 정확하게 전달하세요. 요청이 구체적일수록 원하는 결과에 가까운 답변을 얻을 수 있습니다.   
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>(불명확) “블로그 글 써줘.”</p>
              <p>
                (명확) “고양이 집사들을 위한 6단락짜리 1인칭 블로그 글을 써 주세요. 올랜도라는 생강 고양이와의 재미있는 에피소드를 포함하고, 마지막은 질문으로 끝내 주세요. 
                사료 브랜드 ‘냥냥밥’을 언급해 주세요.” 
              </p>
            </div>
          </section>
          {/* 섹션 3 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">3. 충분한 배경 정보를 입력하세요</h2>
            <p className="text-[#4E4E4E] mt-4">
              AI가 더 나은 답변을 하려면 맥락, 목적, 대상, 관련 정보 등을 제공해야 합니다. 자신이 누구인지, 어떤 상황인지, 원하는 스타일이나 목적 등을 설명하세요.   
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“저는 30대 직장인이고, 자기계발에 관심이 많아요. 자기계발 서적 추천 글을 써 주세요.” </p>
              <p>“우리 회사는 친환경 생활용품을 판매합니다. 홈페이지 소개 문구를 써 주세요.”  </p>
            </div>
          </section>
          {/* 섹션 4 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">4. 예제를 제공해 주세요  </h2>
            <p className="text-[#4E4E4E] mt-4">
              원하는 결과물의 스타일이나 형식을 보여주는 예시를 함께 제시하면, AI가 더 정확하게 모방할 수 있습니다.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“아래와 같은 형식의 트윗을 3개 더 만들어 주세요.</p>
              <p>예시: ‘오늘도 커피 한 잔의 여유. #아침 #힐링’”</p>
              <p>“이런 스타일의 표를 만들어 주세요:  </p>
              <p>| 이름 | 나이 | 직업 |<br/>
              |--------|-----|---------|<br/>
              | 김철수 |  35  | 개발자 |”
              </p>
            </div>
          </section>
          {/* 섹션 5 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">5. 규칙을 구체적으로 정하세요  </h2>
            <p className="text-[#4E4E4E] mt-4">
              AI가 따라야 할 규칙을 명확하게 지시하세요. 형식, 글자 수, 어투, 구조 등 구체적인 기준을 제시하면 결과물이 더 일관되고 정확해집니다.    
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“각 항목을 두 문장 이내로 요약해 주세요.”</p>
              <p>“표는 두 개의 열로 만들어 주세요.”</p> 
              <p>“5세 어린이도 이해할 수 있는 쉬운 단어만 사용해 주세요.”</p>
            </div>
          </section>
          {/* 섹션 6 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">6. 제약 조건을 구체적으로 알려주세요</h2>
            <p className="text-[#4E4E4E] mt-4">
              AI가 반드시 피해야 할 사항이나 제한사항을 명확하게 전달하세요. 해야 할 것과 하지 말아야 할 것을 구분해서 지시하면 품질이 높아집니다.   
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“전문 용어는 사용하지 마세요.”</p>
              <p>“관용구는 사용하지 말고, 문장은 10단어 이내로 작성해 주세요.” </p>
              <p>“부정적인 표현은 피하고, 긍정적인 어조로 써 주세요.”</p>
            </div>
          </section>
          {/* 섹션 7 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">7. 평가하고 반복하세요 </h2>
            <p className="text-[#4E4E4E] mt-4">
              한 번에 완벽한 프롬프트를 만들기는 어렵습니다. 결과물을 평가하고, 부족한 부분을 수정해 반복적으로 개선하세요. 점진적으로 완성도를 높여가면 됩니다.    
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“첫 번째 결과가 너무 길어요. 더 간결하게 줄여 주세요.”</p>
              <p>“문체가 너무 딱딱해요. 좀 더 친근한 어투로 바꿔 주세요.”</p>
              <p>“예시 문장을 추가해 주세요.”</p>
            </div>
          </section>
          {/* 고급 프롬프트 팁 */}
          {/* 1번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">1. 생각 과정을 유도하는 질문을 해보세요.</h2>
            <p className="text-[#4E4E4E] mt-4">
              복잡한 문제를 풀거나, 분석적인 답변이 필요할 땐 “생각하는 순서”를 AI에게 알려주세요.  
              “단계별로 생각해줘”, “먼저 가정하고, 예시를 든 다음 결론을 말해줘” 같은 지시어를 쓰면 더 논리적인 답변을 받을 수 있어요.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“왜 바닷물이 짠지 단계별로 생각해서 설명해줘.”  </p>
              <p>“먼저 정의를 내려주고, 사례를 하나 들어줘. 마지막에 요약해줘.”</p>
              <p>출처: Wei et al., 2022 / Kojima et al., 2023 (Chain-of-Thought Prompting)</p>
            </div>
          </section>
          {/* 2번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">2. 나의 상황과 배경을 더 많이 알려주세요  </h2>
            <p className="text-[#4E4E4E] mt-4">
              AI는 당신이 누구인지, 어떤 목적이 있는지 더 많이 알수록 더 ‘나에게 맞는’ 답변을 해줄 수 있어요.  
              “나는 초보자야”, “중학생한테 설명하듯 말해줘”, “우리 회사는 작은 스타트업이야” 등 배경을 먼저 알려주세요.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“나는 요리 초보야. 간단한 재료로 만들 수 있는 저녁 메뉴 알려줘.”</p>
              <p>“나는 중학교 영어 선생님이야. 학생들이 이해하기 쉬운 표현으로 설명해줘.”</p>
              <p>출처: Li et al., 2024 (Contextual Authoring, Adaptive Prompting)</p>
            </div>
          </section>
          {/* 3번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">3. 예시를 먼저 보여주면 AI가 더 잘 따라해요 </h2>
            <p className="text-[#4E4E4E] mt-4">
              원하는 스타일이나 형식을 보여주면, AI가 그것을 따라 결과물을 만들어줍니다. 예시가 많을수록 결과가 좋아져요.  
              이건 마치 “이런 식으로 해줘!” 하고 보여주는 것과 같아요.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“이런 식의 블로그 문장을 2개만 더 만들어줘:</p>
              <p>- 오늘 아침, 고양이가 내 얼굴을 툭 치며 깨웠다. #냥스타그램  </p>
              <p>- 따뜻한 햇살 아래에서 고양이랑 낮잠. 소확행♥”</p>
              <p>출처: Brown et al., 2020 (Few-shot Prompting, In-Context Learning)</p>
            </div>
          </section>
          {/* 프롬프트 고급 설정 */}
          {/* 설명 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">프롬프트 고급 설정: temperature, top_p, max length 이해하기</h2>
            <p className="text-[#4E4E4E] mt-4">
              ChatGPT의 응답 스타일과 길이를 더욱 세밀하게 제어하고 싶을 때는 `temperature`, `top_p`, `max length` 같은 파라미터를 활용할 수 있습니다.  
              이 항목들은 꼭 알아야 할 필수 설정은 아니지만, 원하는 결과를 얻는 데 큰 도움이 됩니다.
            </p>
          </section>
          {/* 1번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">1. temperature (온도 설정)</h2>
            <p className="text-[#4E4E4E] mt-4">
              온도 설정은 AI가 얼마나 창의적인 답변을 할지 조절하는 파라미터입니다. 낮은 온도는 예측 가능한, 정확한 답변을 생성하고, 높은 온도는 더 다양한 창의적인 답변을 생성합니다. 
              - 낮은 값 (0~0.3): 예측 가능하고 일관된(결정론적) 답변  
              - 높은 값 (0.7~1.0): 창의적이고 다양한 답변
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>낮은 temperature (0.2): “지구는 태양계에 있는 행성입니다.”  </p>
              <p>높은 temperature (0.9): “지구는 우주에서 푸른 빛을 내는 아름다운 행성이며, 생명이 가득한 신비로운 곳입니다!”</p>
              <p>보통 `temperature`와 `top_p`는 **둘 중 하나만 조정**하는 것이 좋습니다</p>
            </div>
          </section>
          {/* 2번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">2. top_p (핵 샘플링)</h2>
            <p className="text-[#4E4E4E] mt-4">
              Top-p는 AI가 다음 단어를 선택할 때, 확률이 높은 후보들만을 고려하는 방식입니다. 이 설정은 답변의 다양성이나 창의성을 제어할 수 있습니다. 
              p값이 높을수록 다양한 답변을 생성합니다. 
              낮은 top-p에서는 더 예측 가능한 답변이, 높은 top-p에서는 더 창의적인 답변이 나옵니다.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>낮은 값 (0.1~0.3): 보수적이고 정확한 답변</p>
              <p>높은 값 (0.8~1.0): 다양하고 창의적인 답변</p>
              <p>보통 `temperature`와 `top_p`는 **둘 중 하나만 조정**하는 것이 좋습니다</p>
            </div>
          </section>
          {/* 3번째 섹션 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">3. max length (응답 길이 제한)</h2>
            <p className="text-[#4E4E4E] mt-4">
              Max Length는 AI가 생성할 수 있는 답변의 최대 길이를 설정하는 파라미터입니다. 이 값을 조정하면 너무 긴 답변을 방지할 수 있습니다.  
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>길이가 30이면 긴 답변, 길이가 10이면 짧은 답변을 생성하게 됩니다.</p>
              <p>- max length 30: “커피는 전 세계적으로 사랑받는 음료입니다. 다양한 방식으로 추출할 수 있으며, 각 나라별로 고유한 커피 문화가 있습니다.”  </p>
              <p>- max length 10: “커피는 인기 있는 음료입니다.”</p>
            </div>
          </section>
          {/* 템플릿 */}
          <section className="mt-16">
            <h2 className="text-[#1A1A1A] text-2xl font-semibold">1. 생각 과정을 유도하는 질문을 해보세요.</h2>
            <p className="text-[#4E4E4E] mt-4">
              복잡한 문제를 풀거나, 분석적인 답변이 필요할 땐 “생각하는 순서”를 AI에게 알려주세요.  
              “단계별로 생각해줘”, “먼저 가정하고, 예시를 든 다음 결론을 말해줘” 같은 지시어를 쓰면 더 논리적인 답변을 받을 수 있어요.
            </p>
            <div className="bg-[#A476CC1A] text-[#4E4E4E] p-4 mt-6 rounded-md border-l-8 border-[#A476CC]">
              <p>“왜 바닷물이 짠지 단계별로 생각해서 설명해줘.”  </p>
              <p>“먼저 정의를 내려주고, 사례를 하나 들어줘. 마지막에 요약해줘.”</p>
              <p>출처: Wei et al., 2022 / Kojima et al., 2023 (Chain-of-Thought Prompting)</p>
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
