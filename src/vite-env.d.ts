/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GEMINI_KEY?: string;
  readonly VITE_OPENWEATHER_API_KEY?: string;
  readonly VITE_OPENWEATHER_KEY?: string;
  readonly VITE_UNSPLASH_ACCESS_KEY?: string;
  readonly VITE_UNSPLASH_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
