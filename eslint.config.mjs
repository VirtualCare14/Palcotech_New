import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Bridge legacy "eslint-config-next" into ESLint v9 flat config.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    // Build artifacts + Next auto-generated types
    ignores: [".next/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // This codebase intentionally uses flexible JSON blobs for CMS-like fields.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];
