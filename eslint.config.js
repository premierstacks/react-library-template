import { browserTypescriptReact, configs, ignores } from '@premierstacks/eslint-stack';

export default [...ignores(['dist']), ...browserTypescriptReact(), ...configs()];
