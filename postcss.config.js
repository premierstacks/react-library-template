import { createPostcssConfigStylex } from '@premierstacks/postcss-stack';

export default createPostcssConfigStylex({
  include: ['./src/**/*.{tsx,mts,ts,cts,jsx,mjs,js,cjs}', './prototype/**/*.{tsx,mts,ts,cts,jsx,mjs,js,cjs}'],
  useCSSLayers: false,
});
