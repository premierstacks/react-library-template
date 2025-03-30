import { createEslintConfigBrowserTypescriptReact, createEslintIgnorePatterns, createEslintOverridesForConfigs } from '@premierstacks/eslint-stack';

export default [...createEslintIgnorePatterns(['dist', 'test-results']), ...createEslintConfigBrowserTypescriptReact(), ...createEslintOverridesForConfigs()];
