import { recommended } from '@app-config/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([globalIgnores(['coverage/']), recommended.node]);
