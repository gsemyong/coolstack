/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PrettierConfig & import("prettier-plugin-tailwindcss").PluginOptions} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
