import { createEslintConfigBrowserTypescriptBabelReact, createEslintIgnorePatterns, createEslintOverridesForConfigs } from '@premierstacks/eslint-stack';

export default [...createEslintIgnorePatterns(['dist', 'test-results']), ...createEslintConfigBrowserTypescriptBabelReact(), ...createEslintOverridesForConfigs()];
