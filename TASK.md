# 집단등기 플랫폼 빌드 태스크

## 개요
법무법인 더 에이치 황해의 입주예정자협의회(입예협) 집단등기팀 전용 법률 AI 플랫폼을 Next.js로 빌드한다.
기능이 실제로 동작해야 한다. 디자인은 세련되고 전문적으로.

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next/font (Noto Sans KR)
- 배포: GitHub Pages (next export)

## 디자인 시스템
- Primary: #2C3E50 (짙은 네이비)
- Accent/Gold: #C9A84C
- Text: #1a1a1a
- Background: #FFFFFF, 섹션 배경 #F8F9FA
- CTA 버튼: border-radius 28px (pill), background #2C3E50, text white
- 카드: shadow 0 2px 8px rgba(0,0,0,0.08), border-radius 12px
- 헤더: 64px 높이, white, border-bottom
- 모바일 우선 반응형

## 페이지 구조

### 1. 메인(홈) `/`
- 헤더: 로고 "법무법인 더에이치황해" + 네비게이션(서비스소개, 계산기, AI상담, 담당단지, 신청하기)
- 히어로 섹션: "입주예정자협의회 집단등기, 디지털로 완성합니다" + 소제목 + CTA 버튼 2개(신청하기, AI상담)
- 수치 섹션: 담당 단지 12개 | 완료 세대 8,400+ | 평균 수수료율 0.22% | 소요 기간 30일
- 서비스 특징 3개 카드: AI 법률상담, 실시간 진행현황, 전문 변호사 직접 처리
- 진행 프로세스: 신청 → 계약 → 등기 진행 → 완료 (4단계 numbered)
- 담당 단지 preview: 최근 3개 단지 카드 (이미지 없이 텍스트+배지로)
- CTA 배너: "지금 바로 무료 상담을 시작하세요" + 버튼
- 푸터: 주소(인천 미추홀구 학익로 60), 전화(032-251-1000), 사업자번호

### 2. 집단등기 신청 `/register`
**완전히 기능하는 폼. Formspree로 실제 이메일 발송.**
- 단계 표시: 1.기본정보 2.단지정보 3.완료
- Step 1: 이름, 연락처(010-0000-0000), 이메일, 역할(회장/총무/임원/일반 수분양자)
- Step 2: 단지명, 소재지(시/도 선택), 총 세대수, 입주 예정일, 문의사항(textarea)
- Step 3: 접수 완료 화면 + 접수번호(랜덤 5자리) + "2영업일 내 연락드립니다"
- Formspree endpoint: https://formspree.io/f/xkgjzdnk (테스트 endpoint, 없으면 console.log로 대체)
- 클라이언트 사이드 유효성 검증 필수

### 3. 집단등기 비용 계산기 `/calculator`
**완전히 기능하는 순수 JS 계산기**

#### 취득세 계산 로직 (정확히 구현할 것):
- 6억 이하: 1%
- 6억 초과 ~ 9억 이하: (취득가액 × 2/3억 - 3) × 0.01 (단순화: 비례 계산)
- 9억 초과: 3%
- 취득세 외 지방교육세(취득세의 10%), 농어촌특별세(취득세의 20%, 단 85㎡ 이하 비과세)
- 생애최초 감면: 12억 이하 주택, 200만원 한도 내 전액 감면

#### 등기 수수료:
- 소유권이전등기: 채권최고액(주택가 × 120%)의 0.2% (국민주택채권 매입)
- 법무법인 수수료: 세대당 30만~50만원 (세대수에 따라 슬라이더)
- 집단 할인: 100세대 이상 시 세대당 28만원, 200세대 이상 22만원

#### UI:
- 주택 취득가액 입력 (슬라이더 + 숫자 입력 병행, 1억~30억)
- 전용면적 선택 (60㎡이하 / 60~85㎡ / 85㎡초과)
- 생애최초 여부 체크박스
- 총 세대수 입력 (집단 할인 계산용)
- 결과: 취득세, 지방교육세, 농특세, 소계, 집단 수수료, **총 비용** 실시간 표시
- "상담 신청하기" CTA 버튼

### 4. AI 법률 상담 `/ai-consult`
**실제 Anthropic API 호출하는 AI 채팅**

#### API Key 처리:
- 첫 방문 시 API Key 입력 모달 표시
- "sk-ant-" 로 시작하는 키 입력
- localStorage에 'anthropic_key'로 저장
- 이후 방문 시 저장된 키 자동 사용
- 설정 아이콘으로 키 변경 가능

#### AI 채팅 UI:
- 좌측: 상담 예시 빠른 질문 버튼들
  - "집단등기 절차가 어떻게 되나요?"
  - "수수료는 얼마나 드나요?"
  - "서류는 무엇이 필요한가요?"
  - "진행 기간은 얼마나 걸리나요?"
  - "잔금 대출과 동시에 진행 가능한가요?"
- 우측: 채팅 인터페이스 (메시지 버블, 입력창, 전송 버튼)
- 로딩 중 애니메이션 (점점점)

#### API 호출:
```javascript
// Anthropic API 직접 호출 (CORS 우회를 위해 프록시 없이 직접)
// 단, Anthropic의 브라우저 직접 호출 제한 있음
// 대안: /api/chat Next.js API route 또는 mock 응답 시스템

// 실제 구현: fetch('/api/chat', { method: 'POST', body: JSON.stringify({ messages, apiKey }) })
// API route에서 Anthropic SDK 사용
```

#### 시스템 프롬프트:
```
당신은 법무법인 더 에이치 황해의 입주예정자협의회 집단등기 전문 AI 상담사입니다.
집단등기 절차, 비용, 서류, 일정에 대해 친절하고 정확하게 안내합니다.
법적 판단이 필요한 사항은 "전문 변호사 상담을 권장드립니다"로 안내하세요.
한국어로 답변하세요. 간결하고 명확하게.
```

**중요**: API Route를 만들어서 서버사이드에서 Anthropic 호출. 프론트에서 API key를 body에 담아 전송.
`/api/chat/route.ts` 파일 생성.

### 5. 담당 단지 현황 `/districts`
- 검색 필터: 지역(시/도), 상태(진행중/완료/예정)
- 단지 카드 그리드 (2열 → 모바일 1열)
- 샘플 데이터 12개 단지 (아래 제공)
- 상태 배지: 진행중(파란색), 완료(초록색), 예정(회색)

**샘플 데이터**:
```typescript
const districts = [
  { id: '1', name: '호반써밋동탄', location: '경기 화성', units: 1842, status: '진행중', progress: 65, date: '2026-04', attorney: '이현준 변호사' },
  { id: '2', name: '힐스테이트 인천시청역', location: '인천 남동', units: 956, status: '진행중', progress: 30, date: '2026-05', attorney: '박성민 변호사' },
  { id: '3', name: 'e편한세상 인천 어천', location: '인천 서구', units: 728, status: '예정', progress: 0, date: '2026-06', attorney: '미정' },
  { id: '4', name: '더샵 인천 부평역 센트럴', location: '인천 부평', units: 1134, status: '완료', progress: 100, date: '2025-11', attorney: '이현준 변호사' },
  { id: '5', name: '검단신도시 우미린 더퍼스트', location: '인천 서구', units: 814, status: '완료', progress: 100, date: '2025-09', attorney: '박성민 변호사' },
  { id: '6', name: '힐스테이트 송도 The H', location: '인천 연수', units: 620, status: '완료', progress: 100, date: '2025-07', attorney: '이현준 변호사' },
  { id: '7', name: 'e편한세상 부천 센트럴파크', location: '경기 부천', units: 1056, status: '진행중', progress: 45, date: '2026-04', attorney: '박성민 변호사' },
  { id: '8', name: '힐스테이트 동탄 포레스트', location: '경기 화성', units: 792, status: '예정', progress: 0, date: '2026-07', attorney: '미정' },
  { id: '9', name: '용인 역북지구 자이', location: '경기 용인', units: 1200, status: '완료', progress: 100, date: '2025-10', attorney: '이현준 변호사' },
  { id: '10', name: '광명 자이 더 샵', location: '경기 광명', units: 3344, status: '진행중', progress: 20, date: '2026-06', attorney: '박성민 변호사' },
  { id: '11', name: '청라 호반써밋', location: '인천 서구', units: 1432, status: '완료', progress: 100, date: '2025-08', attorney: '이현준 변호사' },
  { id: '12', name: '송도 더샵 그린스퀘어', location: '인천 연수', units: 888, status: '예정', progress: 0, date: '2026-08', attorney: '미정' },
]
```

### 6. 단지 상세 `/districts/[id]`
- 상단: 단지명, 위치, 세대수, 상태 배지, 담당 변호사
- 진행 현황 타임라인 (수직 선):
  - ✅ 계약 체결
  - ✅ 서류 수집
  - 🔄 등기 신청 진행중
  - ⏳ 완료 (예정)
- 공지사항 섹션 (샘플 2-3개)
- 담당 변호사 카드 (이름, 연락처, 이메일)
- "신청하기" CTA

### 7. next.config.js 설정
```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/ipyehyup-platform',  // GitHub Pages 경로
}
```

## 구현 순서
1. `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir` 로 프로젝트 초기화
2. 공통 컴포넌트: Header, Footer, Button
3. 홈 페이지
4. 계산기 페이지 (취득세 로직 정확히)
5. AI 상담 페이지 + API route
6. 신청 폼
7. 단지 목록 + 상세
8. GitHub 푸시: `2myeonghee/ipyehyup-platform` (없으면 gh repo create로 생성)
9. GitHub Actions 워크플로우 (`.github/workflows/deploy.yml`)으로 자동 배포 설정

## GitHub Actions 배포 설정
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 중요 사항
- 모든 텍스트 한국어
- 폰트: Google Fonts Noto Sans KR
- 모바일 완전 대응 (320px~)
- 취득세 계산 로직 정확하게 (한국 세법 기준)
- AI 상담은 실제로 동작해야 함 (API key 입력받아 실제 Anthropic 호출)
- 코드 lint/build 오류 없이 `npm run build` 통과할 것
- `npm run build` 후 `/out` 폴더에 정적 파일 생성 확인

완료 후: `openclaw system event --text "집단등기 플랫폼 빌드 완료! GitHub Pages 배포 중" --mode now`
