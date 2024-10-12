import { ignores, browserTypescriptReact, configs } from '@premierstacks/eslint-stack';

export default [...ignores(), ...browserTypescriptReact(), ...configs()];
