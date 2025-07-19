import { createPostcssConfigStylex } from '@premierstacks/postcss-stack';

export default createPostcssConfigStylex({
  include: ['./src/**/*.{tsx,mts,ts,cts,jsx,mjs,js,cjs}', './storybook/**/*.{tsx,mts,ts,cts,jsx,mjs,js,cjs}'],
  useCSSLayers: false,
});
