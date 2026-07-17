import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const config = {
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url))
};

export default config;
