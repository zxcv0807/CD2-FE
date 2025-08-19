### 우문현답의 프론트엔드

## 프로젝트 개요
이 프로젝트는 AI를 기반으로 하는 프롬프트 최적화 시스템을 제공하는 '우문현답' 웹 애플리케이션의 사용자 인터페이스(UI)를 담당합니다.


주요 기술 스택:
- React 
- Vite
- Javascript
- Redux
- TailwindCSS
- React Router Dom
- axios
- react-syntax-highlighter
- react-markdown
- recharts

## 시작하기
사전 준비물: 
- Node.js 18+ 
- npm

설치: 
```bash
git clone https://github.com/zxcv0807/CD2-FE.git
cd frontend
npm install
```

실행:
```bash
npm run dev
```
애플리케이션이 http://localhost:5173에서 실행됩니다.

## 프로젝트 구조
- src/api: 백엔드 API와의 효율적인 데이터 통신 및 비즈니스 로직을 담당합니다.
- src/assets: 이미지, 아이콘 등 프로젝트에 사용되는 정적 자원들을 관리합니다.
- src/components: 재사용 가능한 UI 컴포넌트들을 모아두어 코드의 일관성과 재활용성을 높입니다.
- src/hooks: 재사용 가능한 커스텀 훅들을 정의하여 컴포넌트 로직을 분리하고 재활용합니다.
- src/pages: 애플리케이션의 주요 페이지 컴포넌트들을 정의합니다.
- src/REDUX: Redux를 이용한 전역 상태 관리를 위한 파일들(액션, 리듀서, 스토어 등)을 포함합니다.

## 주요 라이브러리 및 특징
- axios: 백엔드 API와의 비동기 통신을 효율적으로 처리하기 위한 HTTP 클라이언트 라이브러리입니다.
- Tailwind CSS: 유틸리티 우선(Utility-First) 방식으로 빠르게 UI를 구축할 수 있게 해주는 CSS 프레임워크입니다.
- React Router Dom: 클라이언트 사이드 라우팅을 구현하여 SPA(Single Page Application) 환경에서 페이지 전환을 관리합니다.
- Redux: 애플리케이션의 전역 상태를 예측 가능하게 관리하고 중앙 집중화하는 상태 관리 라이브러리입니다.

## 배포
Vercel을 통해 배포함.

## 문의
프론트엔드 관련 문의는 'pg8221@naver.com' 으로 연락 바랍니다.

## trouble shooting
- useState, useMemo, useRef, useEffect의 정리
useState: 컴포넌트 내부에서 상태를 관리하기 위한 훅. 상태가 바뀌면 컴포넌트가 리렌더링 됨.
useMemo: 값을 캐싱(메모이제이션) 하는 훅. 의존성 배열 값이 바뀌지 않으면, 이전에 사용한 값을 재사용. 불필요한 연산이나 렌더링 방지
=> 복잡한 계산이나 동일한 배열/객체를 반복해서 재생성하는 것을 방지
useRef: 값이나 DOM 요소를 기억하는 훅. 값이 바뀌어도 리렌더링이 일어나지 않음.
=> ref.current를 통해 저장된 값에 접근 가능. 컴포넌트가 리렌더링 되어도 같은 ref 객체가 유지됨.
useEffect: 렌더링 후 실행되는 사이드 이펙트 관리 훅. 데이터 fetching, DOM조작, 이벤트 리스너 등록/해제 등에 사용됨.
=> dependency 배열에 따라 실행조건이 다름. []는 최초 마운트시, [value]는 value가 바뀔떄마다 실행.

- 백엔드와 refresh token을 연동하다가 생긴 문제:
```javascript
await axios.post(URL, {
    withCredentials: true,
});
```
위의 코드처럼 코드를 작성하면 body에 withCredentials: true가 들어가서 백엔드로 보내진다.
정상적으로 진행하려면 body의 {}를 추가한 아래의 코드처럼 작성해야한다.
```javascript
await axios.post(URL, {}, {
    withCredentials: true,
});
```
- vercel 배포에서 대문자, 소문자 구분 문제:
REDUX파일을 찾을 수 없다는 에러가 계속 발생했다. 로컬에서는 문제가 없었지만, vercel 빌드시에 지속적으로 오류가 발생했다.
확인 결과, 로컬 개발 환경(Windows/macOS 등)에서는 파일 시스템이 대소문자를 구분하지 않는 경우가 많아 폴더명이나 파일명의 대소문자가 달라도 코드가 정상적으로 작동합니다. 하지만 Vercel의 빌드 환경(리눅스 기반)은 대소문자를 엄격하게 구분합니다.
프로젝트 내 src/REDUX 폴더를 src/redux로 참조하는 코드가 있었으나, 실제 폴더명은 REDUX로 되어 있어 발생한 문제였습니다. Git은 기본적으로 파일명/폴더명의 대소문자 변경을 추적하지 않는 경향이 있어, 로컬에서 폴더명을 변경해도 Git에는 반영되지 않았습니다.
해결방법:
Git 대소문자 구분 활성화
```bash
git config core.ignorecase false
```
이 명령어는 현재 로컬 저장소에서 Git이 파일명/폴더명의 대소문자 변경을 무시하지 않도록 설정합니다.

-axios를 통해 백엔드와 api연동을 할때, response를 변수로 받는 방법 vs response.data를 바로 체이닝 하는 패턴
response를 변수로 받는 방법
```javascript
const response = await axios.post('api주소', {body});
```
이때, 
response.data에는 서버 본문, 
response.status에는 http 상태 코드,
response.headers에는 응답 헤더,
response.config에는 요청 설정
을 사용할 수 있다.

디버깅과 분기를 활용할때는 굉장히 편리한 방법이지만,
data만 필요할때는 쓸데없이 장황하다.

언제 쓰냐면, 성공/실패를 상태 코드로 분기해야할 때, 문제가 생겼을 때, 디버깅이 필요할 때.

response.data만 바로 쓰는 방법
```javascript
const list = await axios.post('api주소', {body}).data
    .sort((a, b) => +new Date(b.modify_at) - +new Date(a.modify_at))
    .map(({ session_id, title, topics }) => ({
        session_id,
        session_title: title,
        topicId: topics[0].topic_id,
        topic: topics[0].topic_name,
    }));
```
간결하고 쉽지만,
상태코드/헤더가 필요해지면 코드 수정이 필요하다. 

언제쓰냐면, UI 전처리(map/sort/filter) 위주의 화면 데이터 가공
상태/헤더가 필요없는 단순한 CRUD 응답 처리