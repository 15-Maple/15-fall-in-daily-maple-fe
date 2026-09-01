import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "perfectionist/sort-jsx-props": [
        "warn",
        {
          type: "natural",
          order: "asc",
          customGroups: [
            {
              groupName: "identifier",
              elementNamePattern: "^(id|key|name|ref)$",
            },
            {
              groupName: "styling",
              elementNamePattern: "^(className|style)$",
            },
            {
              groupName: "callback",
              elementNamePattern: "^on[A-Z].*",
            },
          ],
          groups: ["identifier", "unknown", "styling", "callback"],
        },
      ],
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "natural",
          order: "asc",
          customGroups: [
            {
              groupName: "internal-logic",
              elementNamePattern: ["(hooks|utils|store|api|lib)"],
            },
            {
              groupName: "internal-component",
              elementNamePattern: ["(components|pages)"],
            },
            {
              groupName: "assets",
              elementNamePattern: ["\\.(svg|png|jpg|jpeg|gif|webp)$"],
            },
          ],
          groups: [
            "builtin",
            "external",
            "internal-logic",
            "internal-component",
            ["internal", "parent", "sibling", "index"],
            "assets",
            "style",
            "side-effect-style",
          ],
          newlinesBetween: 1,
        },
      ],
    },
  },
]);
