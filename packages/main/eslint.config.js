import { defineConfig, globalIgnores } from 'eslint/config';
import { recommended } from '../../configs/eslint/index.mjs';

export default defineConfig([globalIgnores(['coverage/']), recommended.node]);
