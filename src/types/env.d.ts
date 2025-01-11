declare namespace WebpackDefinePlugin {
  interface ProcessEnv {
    API_DNS: string;
  }
}

declare const process: {
  env: WebpackDefinePlugin.ProcessEnv;
};
