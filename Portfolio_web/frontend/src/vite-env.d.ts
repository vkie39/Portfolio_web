/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  // 여기에 다른 환경 변수들도 정의하면 자동 완성이 지원됩니다.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}