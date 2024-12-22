declare namespace WebpackDefinePlugin {
  interface ProcessEnv {
    API_DNS: string;
  }
}

declare let process: {
  env: WebpackDefinePlugin.ProcessEnv;
};
