<div align="center">
  <a href="https://www.meong-road.site/regular">
    <img
      src="https://github.com/user-attachments/assets/f2c2846e-06e5-4e32-9077-ef55086f600d"
      alt="로고"
      width="550"
      height="275"
    />
  </a>
  <h3>반려견 산책 모임 서비스 '멍로드'</h3>
</div>

## 📌 OverView
💻 **개요**  
반려견과 함께할 친구를 찾기 어려운 문제를 해결하기 위해, 반려견 보호자와 비반려인이 함께 산책 모임을 즐길 수 있는 커뮤니티 플랫폼입니다.  
정기·번개 모임을 통해 꾸준한 산책 루틴과 신뢰 기반의 건강한 반려 문화 형성을 목표로 합니다.  
</br>
📎 **배포 링크**  
https://www.meong-road.site/regular  
</br>
🗓️ **개발 기간**  
2025.09.15 - 2025.11.04  

</br>

## 👩🏻‍💻Developers🧑🏻‍💻
| 👤 이름 | 이수빈 | 서웅덕 | 이한별 | 한상휘 |
|------|--------|--------|--------|--------|
| 🔗 GitHub | [ddongguri-bing](https://github.com/ddongguri-bing) | [sn14188](https://github.com/sn14188) | [2hanbyeol1](https://github.com/2hanbyeol1) | [Sangmwi](https://github.com/Sangmwi) |

</br>

## 🚀 Tech Stack

### Framework
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Package Manager
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)

### Server State Manager


### Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![shadcnui](https://img.shields.io/badge/shadcnui-000000?style=flat-square&logo=shadcnui&logoColor=white)

### Deploy
![githubactions](https://img.shields.io/badge/githubactions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

# Meong Road Frontend

Next.js 15(App Router)와 React 19 기반으로 구축한 프론트엔드 애플리케이션입니다. TypeScript와 Tailwind CSS 4를 사용하며, React Query와 MSW(Mock Service Worker)로 데이터 페칭과 API 모킹 환경을 제공합니다.

## 시작하기

```
pnpm install
pnpm dev
```

- 개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.
- `src/app/layout.tsx`에서 React Query Provider와 MSW Provider가 초기화되므로, 실행과 동시에 모킹 API가 동작합니다.

## 주요 명령어

```
pnpm dev           # 개발 서버 실행
pnpm build         # 프로덕션 빌드 생성
pnpm start         # 빌드 결과 실행
pnpm lint          # ESLint 검사
pnpm test          # 전체 Jest 테스트 실행
pnpm test:watch    # Jest watch 모드
pnpm test:changed  # 변경된 파일만 테스트
```

커밋 전에 Husky pre-commit 훅이 `lint-staged`와 `pnpm test:changed`를 실행해 포맷과 테스트 상태를 유지합니다.

## 주요 라이브러리

- **Next.js 15 / React 19**: App Router 기반 SPA/SSR 프레임워크
- **TypeScript 5**: Strict 옵션 활성화, 경로 별칭 `@/*` 지정
- **Tailwind CSS 4 + tailwind-merge + clsx**: 유틸리티 클래스 기반 스타일링과 클래스 병합
- **@tanstack/react-query 5**: 서버 상태 관리 및 캐싱
- **Zustand 5**: 전역 상태 관리(스토어 디렉터리 준비됨)
- **MSW 2**: 브라우저/테스트 환경 공통 API 모킹(`src/mocks`)
- **Framer Motion 12**: 애니메이션 구현 준비
- **Jest 30 + jest-fixed-jsdom + Testing Library**: 단위/컴포넌트 테스트

## 프로젝트 구조

```
src/
  app/          # App Router 엔트리, 레이아웃, 페이지 및 전역 스타일
  assets/       # 폰트/이미지 자산 인덱스 파일
  components/   # 재사용 컴포넌트 엔트리(구현 예정)
  hooks/        # 커스텀 훅 엔트리(구현 예정)
  mocks/        # MSW 서버/워커 설정과 요청 핸들러
  providers/    # React Query, MSW 등 전역 Provider 컴포넌트
  store/        # Zustand 스토어 엔트리(구현 예정)
  utils/        # 공용 유틸 함수 (`cn` 등)
```

## 품질 관리

- **ESLint + Prettier**: `eslint.config.mjs`에서 Flat Config로 설정, `simple-import-sort`를 적용해 모듈 정렬.
- **Jest 환경 구성**: `jest.config.ts`와 `jest.setup.ts`로 `msw` 서버 라이프사이클 제어.
- **Lint-Staged + Husky**: 변경 파일에 대해 자동 포맷 및 테스트 실행.

## 빌드 & 배포 파이프라인

- GitHub Actions 워크플로우
  - `deploy-preview.yml`: `dev` 브랜치 PR/머지 시 프리뷰 배포
  - `deploy-production.yml`: `main` 브랜치 PR/머지 시 프로덕션 배포
  - 공통 단계: Checkout → Node 20 & pnpm 세팅 → `pnpm install --frozen-lockfile` → `pnpm test` → Vercel CLI `pull`/`build`/`deploy`
- Vercel 설정
  - `.vercel/project.json`에 조직/프로젝트 ID 저장
  - `vercel.json`에서 Git 연동 배포 비활성화 → CI를 통한 수동 배포 흐름 유지
