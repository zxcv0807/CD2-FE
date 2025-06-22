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