import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next v16 ships native flat configs; the previous FlatCompat
// bridge crashed under ESLint 9 (and `next lint` was removed in Next 16).
const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
