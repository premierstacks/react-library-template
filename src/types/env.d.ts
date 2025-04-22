declare const process: {
  env: {
    NODE_ENV: string; // 'development' | 'production'
    WEBPACK_MODE: string; // 'development' | 'production'
    APP_VERSION: string; // regex: ^\d+\.\d+\.\d+$
    APP_NAME: string; // regex: ^[a-zA-Z0-9-_]+$
    APP_ENV: string; // 'local' | 'development' | 'testing' | 'staging' | 'production' | 'playwright'
    OTLP_API_KEY: string | null; // regex: ^[a-zA-Z0-9]+$
  };
};
