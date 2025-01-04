module.exports = {
  root: true,
  extends: ["expo", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  plugins: ["eslint-plugin-react-compiler", "prettier"],
  rules: {
    "react-compiler/react-compiler": "error",
    "prettier/prettier": "warn",
  },
};
